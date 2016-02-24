/**
 * CompanyController
 *
 * @description :: Server-side logic for managing companies
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var _ = require('underscore'),
  async = require('async');

module.exports = {
  create: function (request, response) {
    var user = request.user,
      companyData = request.body || {};

    companyData.owner = user.id;
    Company.create(companyData).exec(function (error, company) {
      if (error) {
        return response.send(500, {
          code: 'error',
          message: error
        });
      }

      return response.send(200, {
        code: 'successful',
        message: 'Company was successfully created',
        company: company
      });
    });
  },

  update: function (request, response) {
    var companyData = request.body || {},
      companyId = request.param('id'),
      user = request.user,
      userId = user.id;

    if (_.isEmpty(companyId)) {
      return response.send(400, {
        code: 'error',
        message: 'Company id is not defined'
      });
    }

    Company.findOne({id: companyId}).populate('teams').exec(function (error, company) {
      var adminTeam,
        isAdmin = false;

      if (error) {
        return response.serverError(error);
      }

      if (_.isEmpty(company)) {
        return response.send(400, {
          code: 'not.found',
          message: 'Company was not found'
        });
      }

      _.each(company.teams, function (team) {
        if (team.admin) {
          adminTeam = team;
        }
      });

      if (_.isEmpty(adminTeam)) {
        return response.send(404, {
          code: 'error',
          message: 'Admin team not found'
        });
      }

      _.each(adminTeam.members, function (member) {
        if (member.id === userId) {
          isAdmin = true;
        }
      });

      if (!isAdmin) {
        return response.send(403, {
          code: 'access.denied',
          message: 'Access denied'
        });
      }

      _.extend(company, companyData);

      company.save(function (error, company) {
        var returnedCompany;

        if (error) {
          return response.send(500, {
            code: 'error',
            message: error
          });
        }

        returnedCompany = _.pick(company, 'name', 'createAt', 'updatedAt', 'id');
        response.send(200, {
          code: 'successful',
          message: 'Company was successfully updated',
          company: returnedCompany
        });
      });
    });
  },

  findOne: function (request, response) {
    var companyId = request.param('id'),
      user = request.user,
      userId = user.id;

    if (_.isEmpty(companyId)) {
      return response.send(400, {
        code: 'error',
        message: 'Company id is not defined'
      });
    }

    Company.findOne({id: companyId})
      .populate('teams')
      .populate('projects')
      .exec(function (error, company) {
        var adminTeam,
          isAdmin = false;

        if (error) {
          return response.serverError(error);
        }

        if (_.isEmpty(company)) {
          return response.send(400, {
            code: 'not.found',
            message: 'Company was not found'
          });
        }

        _.each(company.teams, function (team) {
          if (team.admin) {
            adminTeam = team;
          }
        });

        if (_.isEmpty(adminTeam)) {
          return response.send(404, {
            code: 'error',
            message: 'Admin team not found'
          });
        }

        Team.findOne({id: adminTeam.id})
          .populate('members')
          .exec(function (err, team) {
            _.each(team.members, function (member) {
              if (member.id === userId) {
                isAdmin = true;
              }
            });

            if (!isAdmin) {
              return response.send(403, {
                code: 'access.denied',
                message: 'Access denied'
              });
            }

            response.send(200, {
              code: 'successful',
              message: 'Company was successfully found',
              company: company
            });
          });
      });
  },

  remove: function (request, response) {
    var companyId = request.param('id'),
      user = request.user,
      userId = user.id;

    if (_.isEmpty(companyId)) {
      return response.send(400, {
        code: 'error',
        message: 'Company id is not defined'
      });
    }

    Company.findOne({id: companyId})
      .exec(function (error, company) {
        var adminTeam,
          isAdmin = false;

        if (error) {
          return response.serverError(error);
        }

        if (_.isEmpty(company)) {
          return response.send(400, {
            code: 'not.found',
            message: 'Company was not found'
          });
        }

        _.each(company.teams, function (team) {
          if (team.admin) {
            adminTeam = team;
          }
        });

        if (_.isEmpty(adminTeam)) {
          return response.send(404, {
            code: 'error',
            message: 'Admin team not found'
          });
        }

        _.each(adminTeam.members, function (member) {
          if (member.id === userId) {
            isAdmin = true;
          }
        });

        if (!isAdmin) {
          return response.send(403, {
            code: 'access.denied',
            message: 'Access denied'
          });
        }

        Company.destroy({id: companyId})
          .exec(function (error, companies) {
            if (error) {
              return response.send(500, {
                code: 'error',
                message: error
              });
            }

            if (_.isEmpty(companies)) {
              return response.send(400, {
                code: 'not.found',
                message: 'Company was not found'
              });
            }

            return response.send(200, {
              code: 'successful',
              message: 'Company was removed successfully',
              company: companies
            });
          });
      });
  },

  find: function (request, response) {
    var user = request.user;

    User.findOne({id: user.id}).populate('teams').exec(function (error, user) {
      var teams,
        adminTeams = [],
        companies = [];

      if (error) {
        return response.serverError(error);
      }

      if (_.isEmpty(user)) {
        return response.send(400, {
          code: 'not.found',
          message: 'User was not found'
        });
      }

      teams = user.teams;
      if (_.isEmpty(teams)) {
        return response.send(404, {
          code: 'not.found',
          message: 'Teams not found'
        });
      }

      _.each(teams, function (team) {
        if (team.admin) {
          adminTeams.push(team);
        }
      });

      if (_.isEmpty(adminTeams)) {
        return response.send(404, {
          code: 'not.found',
          message: 'You haven\'t access to admin teams'
        });
      }

      async.each(adminTeams, function (team, callback) {
        async.waterfall([
          function (callback) {
            Company.findOne(team.company).exec(callback);
          },
          function (company, callback) {
            companies.push(company);
            callback(null);
          }
        ], callback);
      }, function (error) {
        if (error) {
          return response.serverError(error);
        }

        response.send(200, {
          code: 'success',
          companies: companies
        });
      });
    });
  },

  findTeams: function (request, response) {
    var companyId = request.param('id'),
      user = request.user,
      userId = user.id;

    if (_.isEmpty(companyId)) {
      return response.send(400, {
        code: 'error',
        message: 'Company id is not defined'
      });
    }

    Company.findOne({id: companyId})
      .exec(function (error, company) {
        var adminTeam,
          isAdmin = false;

        if (error) {
          return response.serverError(error);
        }

        if (_.isEmpty(company)) {
          return response.send(400, {
            code: 'not.found',
            message: 'Company was not found'
          });
        }

        _.each(company.teams, function (team) {
          if (team.admin) {
            adminTeam = team;
          }
        });

        if (_.isEmpty(adminTeam)) {
          return response.send(404, {
            code: 'error',
            message: 'Admin team not found'
          });
        }

        _.each(adminTeam.members, function (member) {
          if (member.id === userId) {
            isAdmin = true;
          }
        });

        if (!isAdmin) {
          return response.send(403, {
            code: 'access.denied',
            message: 'Access denied'
          });
        }

        Team.find({company: companyId})
          .populate('members')
          .populate('permissions')
          .exec(function (error, teams) {
            if (error) {
              return response.send(500, {
                code: 'error',
                message: error
              });
            }

            return response.send(200, {
              code: 'successful',
              message: 'Company\'s teams were successfully found',
              teams: teams
            });
          });
      });
  },

  findProjects: function (request, response) {
    var companyId = request.param('id'),
      user = request.user,
      userId = user.id;

    if (_.isEmpty(companyId)) {
      return response.send(400, {
        code: 'error',
        message: 'Company id is not defined'
      });
    }

    Company.findOne({id: companyId})
      .populate('teams')
      .populate('projects')
      .exec(function (error, company) {
        var adminTeam,
          isAdmin = false;

        if (error) {
          return response.serverError(error);
        }

        if (_.isEmpty(company)) {
          return response.send(400, {
            code: 'not.found',
            message: 'Company was not found'
          });
        }

        _.each(company.teams, function (team) {
          if (team.admin) {
            adminTeam = team;
          }
        });

        if (_.isEmpty(adminTeam)) {
          return response.send(404, {
            code: 'error',
            message: 'Admin team not found'
          });
        }

        Team.findOne({id: adminTeam.id}).populate('members').exec(function (error, team) {
          _.each(team.members, function (member) {
            if (member.id === userId) {
              isAdmin = true;
            }
          });

          if (!isAdmin) {
            return response.send(403, {
              code: 'access.denied',
              message: 'Access denied'
            });
          }

          response.send(200, {
            code: 'successful',
            message: 'Company\'s projects were successfully found',
            projects: company.projects
          });


        });

      });
  }
};


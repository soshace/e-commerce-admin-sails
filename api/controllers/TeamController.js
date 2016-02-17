/**
 * TeamController
 *
 * @description :: Server-side logic for managing teams
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var _ = require('underscore');

module.exports = {
  create: function (request, response) {
    var projectData = request.body || {},
      profile = request.user;

    projectData.owner = profile.id;
    Team.create(projectData).exec(function (error, team) {
      if (error) {
        return response.send(500, {
          code: 'error',
          message: error
        });
      }

      response.send(200, {
        code: 'successful',
        team: team
      });
    });
  },

  //TODO: need to close access to change team to administrators
  update: function (request, response) {
    var teamData = request.body || {},
      team = request.team || {};

    _.extend(team, teamData);

    team.save(function (error, team) {
      var returnedTeam;

      if (error) {
        return response.send(500, {
          code: 'error',
          message: error
        });
      }

      returnedTeam = _.pick(team, 'id', 'name', 'createdAt', 'updatedAt');
      response.send(200, {
        code: 'successful',
        message: 'Team was successfully updated',
        team: returnedTeam
      });
    });
  },

  find: function (request, response) {
    var user = request.user;

    Team.find({owner: user.id})
      .exec(function (error, teams) {
        if (error) {
          return response.send(500, {
            code: 'error',
            message: error
          });
        }

        return response.send(200, {
          code: 'successful',
          teams: teams
        });
      });
  },

  findOne: function (request, response) {
    var teamId = request.param('id');

    Team.findOne({id: teamId})
      .populate('permissions')
      .populate('members')
      .exec(function (error, team) {
        if (error) {
          return response.send(500, {
            code: 'error',
            message: error
          });
        }

        if (typeof team === 'undefined') {
          return response.send(400, {
            code: 'not.found',
            message: 'Team not found'
          });
        }

        return response.send(200, {
          code: 'successful',
          message: 'Team was successfully found',
          team: team
        });
      });
  },


  remove: function (request, response) {
    var teamId = request.param('id'),
      team = request.team,
      adminTeam = team.admin;

    if (adminTeam) {
      return response.send(403, {
        code: 'forbidden',
        message: 'You are not able to delete Administrator\'s team'
      });
    }

    Team.destroy({id: teamId})
      .exec(function (error, team) {
        if (error) {
          return response.send(500, {
            code: 'error',
            message: error
          });
        }

        if (typeof team === 'undefined') {
          return response.send(400, {
            code: 'not.found',
            message: 'Team not found'
          });
        }

        return response.send(200, {
          code: 'successful',
          message: 'Team was removed successfully',
          team: team
        });
      });
  },

  findPermissions: function (request, response) {
    var teamId = request.param('id');

    Permission.find({team: teamId})
      .populate('members')
      .exec(function (error, permission) {
      if (error) {
        return response.serverError(error);
      }

      return response.send(200, {
        code: 'successful',
        permissions: permission
      });
    });
  },

  removeMember: function (request, response) {
    var memberId = request.param('memberId'),
      team = request.team,
      adminTeam = team.admin,
      onlyOneMember = team.members.length === 1;


    sails.log('----TeamController RemoveMember team onlyOneMember----', team, team.members);
    if (adminTeam && onlyOneMember) {
      return response.send(403, {
        code: 'forbidden',
        message: 'You are not able to delete last user in Administrator\'s team'
      });
    }

    async.waterfall([
      function (callback) {
        team.members.remove(memberId);
        team.save(callback);
      },
      function (team, callback) {
        Permission.find({team: team.id}).exec(callback);
      },
      function (permissions, callback) {
        async.each(permissions, function (permission, callback) {
          permission.members.remove(memberId);
          permission.save(callback);
        }, callback);
      }
    ], function (error) {
      if (error) {
        return response.serverError(error);
      }
    });
    team.save(function (error, team) {

      return response.send(200, {
        code: 'successful',
        message: 'Team member was removed successfully',
        team: team
      });
    });
  }
};


/**
 * ProjectController
 *
 * @description :: Server-side logic for managing projects
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var _ = require('underscore'),
  async = require('async');

module.exports = {
  checkSlug: function (request, response) {
    var slug = request.param('slugName');

    if (typeof slug === 'undefined') {
      return response.send(400, {
        code: 'error.slug.empty',
        message: 'Slug name can\'t be empty'
      });
    }

    Project.findOne({slug: slug}).exec(function (error, project) {
      if (error) {
        return response.serverError(error);
      }

      if (project) {
        return response.send(409, {
          code: 'error.slug.exists',
          message: 'Slug name is already exists'
        });
      }
      response.send(200, {
        code: 'slug.available',
        message: 'Slug name is available'
      });
    });
  },

  create: function (request, response) {
    var projectData = request.body || {},
      companyId = projectData.company,
      user = request.user,
      userId = user.id;

    if (_.isEmpty(companyId)) {
      return response.send(400, {
        code: 'error',
        message: 'You need to specify company id'
      });
    }

    Company.findOne({id: companyId}).populate('teams').exec(function (error, company) {
      var teams,
        adminTeam,
        isAdmin = false;

      if (error) {
        return response.serverError(error);
      }

      if (_.isEmpty(company)) {
        return response.send(404, {
          code: 'not.found',
          message: 'Company not found'
        });
      }

      teams = company.teams;
      _.each(teams, function (team) {
        if (team.admin) {
          adminTeam = team;
        }
      });

      if (_.isEmpty(adminTeam)) {
        return response.send(404, {
          code: 'not.found',
          message: 'Admin team not found'
        })
      }

      _.each(adminTeam.members, function (teamMember) {
        if (teamMember === userId) {
          isAdmin = true;
        }
      });

      if (!isAdmin) {
        return response.send(403, {
          code: 'access.denied',
          message: 'Access denied'
        });
      }

      Project.create(projectData).exec(function (error, project) {
        if (error) {
          return response.serverError(error);
        }

        response.send(200, {
          code: 'successful',
          project: project
        });
      });
    });
  },

  update: function (request, response) {
    var projectData = request.body,
      projectId = request.param('id'),
      user = request.user,
      userId = user.id;

    PermissionsService.getPermissionsByProject(userId, projectId, function (error, permission, project) {
      if (error) {
        return response.serverError(error);
      }

      if (!permission.admin) {
        return response.send(403, {
          code: 'access.denied',
          message: 'Access denied'
        });
      }

      _.extend(project, projectData);

      project.save(function (error, project) {
        var returnedProject,
          company;

        if (error) {
          return response.serverError(error);
        }

        if (typeof project === 'undefined') {
          return response.send(404, {
            code: 'not.found',
            message: 'project not found'
          });
        }

        returnedProject = _.clone(project);
        company = returnedProject.company;
        returnedProject.company = company && company.id;
        returnedProject = _.pick(returnedProject, 'id', 'name', 'createdAt', 'updatedAt', 'company', 'owner');

        response.send(200, {
          code: 'successful',
          message: 'Project was successfully updated',
          project: returnedProject
        });
      });
    });
  },

  findOne: function (request, response) {
    var userId = request.user.id,
      projectId = request.param('id');

    Project.findOne({id: projectId})
      .populate('permissions')
      .exec(function (error, project) {
        var hasAccessByPermissions;

        if (error) {
          return response.serverError(error);
        }

        if (typeof project === 'undefined') {
          return response.send(400, {
            code: 'not.found',
            message: 'Project was not found'
          });
        }


        hasAccessByPermissions = PermissionsService.accessByOnePermission(userId, project.permissions);
        if (hasAccessByPermissions) {
          return response.send(200, {
            code: 'successful',
            message: 'Project was successfully found',
            project: project
          });
        }

        response(403, {
          code: 'access.denied',
          message: 'Access denied'
        });
      });
  },

  remove: function (request, response) {
    var projectId = request.param('id'),
      user = request.user,
      userId = user.id;

    PermissionsService.getPermissionsByProject(userId, projectId, function (error, permission) {
      if (error) {
        return response.serverError(error);
      }

      if (!permission.admin) {
        return response.send(403, {
          code: 'access.denied',
          message: 'Access denied'
        });
      }

      Project.destroy({id: projectId})
        .exec(function (error, projects) {
          if (error) {
            return response.serverError(error);
          }

          if (typeof projects === 'undefined') {
            return response.send(400, {
              code: 'not.found',
              message: 'Project was not found'
            });
          }

          response.send(200, {
            code: 'successful',
            message: 'Project was removed successfully',
            projects: projects
          });
        });
    });
  },

  find: function (request, response) {
    var user = request.user,
      userId = user.id;

    async.waterfall([
        function (callback) {
          User.findOne({id: userId}).populate('permissions').exec(callback);
        },
        function (userPopulated, callback) {
          var projects = [],
            permissions = userPopulated.permissions;

          async.each(permissions, function (permission, callback) {
            Project.findOne({id: permission.project}).exec(function (error, project) {
              if (error) {
                return callback(error);
              }

              if (!_.isEmpty(project)) {
                projects.push(project);
              }

              callback(null, projects);
            });
          }, function (error) {
            callback(error, projects);
          });
        },
        function (projectsByPermissions, callback) {
          sails.log('--------ProjectController find----------', projectsByPermissions);

          Project.find({owner: userId}).exec(function (error, ownProjects) {
            ownProjects = ownProjects || [];
            callback(error, ownProjects, projectsByPermissions);
          });
        },
        function (ownProjects, projectsByPermissions, callback) {

          var projects = projectsByPermissions.concat(ownProjects);
          callback(null, projects);
        }
      ],
      function (error, fullListOfProjects) {
        if (error) {
          return response.serverError(error);
        }

        return response.send(200, {
          code: 'successful',
          projects: fullListOfProjects
        });
      });
  },

  findProjectCategories: function (request, response) {
    var user = request.user,
      userId = user.id,
      projectId = request.param('id');

    async.waterfall([
      function (callback) {
        PermissionsService.getPermissionsByProject(userId, projectId, callback);
      },
      function (permission, callback) {
        if (permission.admin) {
          return Category.find({project: projectId}).exec(function (error, categories) {
            if (error) {
              return callback(error);
            }

            response.send(200, {
              code: 'successful',
              categories: categories
            });
            return callback(null);
          });
        }

        response.send(403, {
          code: 'access.denied',
          message: 'Access denied'
        });

        callback(null);
      }
    ], function (error) {
      if (error) {
        return response.serverError(error);
      }
    });
  },

  findProjectProducts: function (request, response) {
    var user = request.user,
      userId = user.id,
      query = request.query || {},
      requestObj = {},
      paginate = {},
      findResults,
      projectId = request.param('id');

    async.waterfall([
      function (callback) {
        PermissionsService.getPermissionsByProject(userId, projectId, callback);
      },
      function (permission, callback) {
        if (!permission.admin) {
          response.send(403, {
            code: 'permission.denied',
            message: 'Permission denied'
          });
          return callback(null);
        }

        requestObj = {
          project: projectId
        };

        if (query.page) {
          paginate.page = query.page;
        }

        if (query.limit) {
          paginate.limit = query.limit;
        }

        if (query.name) {
          requestObj.name = query.name;
        }

        findResults = Product.find(requestObj);

        if (!_.isEmpty(paginate)) {
          findResults = findResults.paginate(paginate);
        }

        Product.count(requestObj).exec(function (error, productNum) {
          if (error) {
            return response.serverError(error);
          }

          findResults.exec(function (error, products) {
            if (error) {
              callback(error);
            }

            sails.log('----ProjectController findProjectProducts arguments----', arguments);

            response.send(200, {
              code: 'successful',
              products: products,
              amount: productNum
            });
            callback(null);
          });
        });
      }], function (error) {
      if (error) {
        return response.serverError(error);
      }
    });
  },

  findProjectProductTypes: function (request, response) {
    var projectId = request.param('id'),
      user = request.user,
      userId = user.id;

    PermissionsService.getPermissionsByProject(userId, projectId, function (error, permission) {
      if (error) {
        return response.serverError(error);
      }

      if (!permission.admin) {
        return response.send(403, {
          code: 'access.denied',
          message: 'Access denied'
        });
      }

      ProductType.find({project: projectId}).populate('categories').exec(function (error, productTypes) {
        if (error) {
          return response.serverError(error);
        }

        return response.send(200, {
          code: 'successful',
          productTypes: productTypes
        });
      });
    });
  },

  findPermissions: function (request, response) {
    var projectId = request.param('id');

    Permission.find({project: projectId}).exec(function (error, permission) {
      if (error) {
        return response.serverError(error);
      }

      return response.send(200, {
        code: 'successful',
        permissions: permission
      });
    });
  }
};

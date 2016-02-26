/**
 * ProjectController
 *
 * @description :: Server-side logic for managing projects
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var _ = require('underscore'),
  async = require('async'),
  adminsOnly = require('../services/CompanyService').adminsOnly,
  ProjectService = require('../services/ProjectService');

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
      if (error) {
        return response.serverError(error);
      }

      if (_.isEmpty(company)) {
        return response.send(404, {
          code: 'not.found',
          message: 'Company not found'
        });
      }

      adminsOnly(response, company.teams, userId, function () {
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

    });
  },

  update: function (request, response) {
    var projectData = request.body,
      projectId = request.param('id'),
      user = request.user;

    Project.findOne({id: projectId}).exec(function (err, project) {
      if (err) {
        return response.send(err);
      }
      PermissionsService.adminsOnly(user, project, function (err) {
        if (err) {
          return response.send(err);
        }
        _.extend(project, projectData);

        project.save(function (error, project) {
          var returnedProject,
            company;

          if (error) {
            return response.serverError(error);
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
          User.findOne({id: userId})
            .populate('teams')
            .exec(callback);
        },
        function (user, callback) {
          var projects = [];
          async.each(user.teams, function (team, callback) {
            ProjectService.getTeamProjects(team, function (err, teamProjects) {
              teamProjects.forEach(function (project) {
                if (!(_.findWhere(projects, {id: project.id}))) {
                  projects.push(project);
                }
              });
              callback();
            })
          }, function (err) {
            callback(null, projects);
          });
        }
      ],
      function (error, projects) {
        if (error) {
          return response.serverError(error);
        }

        return response.send(200, {
          code: 'successful',
          projects: projects
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
        var allowed = permission.admin || (permission.productsPermission !== 'none');
        if (allowed) {
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
        var allowed = permission.admin || (permission.productsPermission !== 'none');
        if (!allowed) {
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
      var allowed = permission.admin || (permission.productsPermission !== 'none');
      if (error) {
        return response.serverError(error);
      }

      if (!allowed) {
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
    var user = request.user,
      userId = user.id,
      projectId = request.param('id');

    Permission.find({project: projectId}).exec(function (error, permissions) {
      var userPermission;

      if (error) {
        return response.serverError(error);
      }

      userPermission = PermissionsService.getPermissionByUser(userId, permissions);

      if (_.isEmpty(userPermission) || !userPermission.admin) {
        return response.send(403, {
          code: 'access.denied',
          message: 'access denied'
        });
      }

      return response.send(200, {
        code: 'successful',
        permissions: permissions
      });
    });
  }
};

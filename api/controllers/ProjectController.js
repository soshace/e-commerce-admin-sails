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
      profile = request.user;

    projectData.owner = profile.id;
    Project.create(projectData).exec(function (error, project) {
      if (error) {
        return response.serverError(error);
      }

      response.send(200, {
        code: 'successful',
        project: project
      });
    });
  },

  update: function (request, response) {
    var projectData = {},
      projectName = request.body && request.body.name,
      project = request.project || {};

    if (_.isString(projectName) && projectName.length) {
      projectData.name = projectName;
    }

    _.extend(project, projectData);

    project.save(function (error, project) {
      var returnedProject,
        company,
        owner;

      if (error) {
        return response.serverError(error);
      }

      returnedProject = _.clone(project);
      company = returnedProject.company;
      owner = returnedProject.owner;
      returnedProject.company = company && company.id;
      returnedProject.owner = owner && owner.id;
      returnedProject = _.pick(returnedProject, 'id', 'name', 'createdAt', 'updatedAt', 'company', 'owner');
      response.send(200, {
        code: 'successful',
        message: 'Project was successfully updated',
        project: returnedProject
      });
    });
  },

  findOne: function (request, response) {
    var userId = request.user.id,
      projectId = request.param('id');

    Project.findOne({id: projectId})
      .populate('permissions')
      .exec(function (error, project) {
        if (error) {
          return response.serverError(error);
        }

        if (typeof project === 'undefined') {
          return response.send(400, {
            code: 'not.found',
            message: 'Project was not found'
          });
        }

        if (!PermissionsService.accessByOnePermission(userId, project.permissions)) {
          return response(403, {
            code: 'access.denied',
            message: 'Access denied'
          });
        }

        response.send(200, {
          code: 'successful',
          message: 'Project was successfully found',
          project: project
        });
      });
  },

  //TODO: need to check all tied products!
  remove: function (request, response) {
    var projectId = request.param('id');

    Project.destroy({id: projectId})
      .exec(function (error, project) {
        if (error) {
          return response.serverError(error);
        }

        if (typeof project === 'undefined') {
          return response.send(400, {
            code: 'not.found',
            message: 'Project was not found'
          });
        }

        response.send(200, {
          code: 'successful',
          message: 'Project was removed successfully',
          project: project
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
            Project.find({id: permission.project}).exec(function (error, project) {
              if (error) {
                return callback(error);
              }

              projects.push(project);
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
    var projectId = request.param('id');

    Category.find({project: projectId}).exec(function (error, categories) {
      if (error) {
        return response.serverError(error);
      }

      return response.send(200, {
        code: 'successful',
        categories: categories
      });
    });
  },

  findProjectProducts: function (request, response) {
    var projectId = request.param('id');

    Product.find({project: projectId}).exec(function (error, products) {
      if (error) {
        return response.serverError(error);
      }

      return response.send(200, {
        code: 'successful',
        products: products
      });
    });
  },

  findProjectProductTypes: function (request, response) {
    var projectId = request.param('id');

    ProductType.find({project: projectId}).exec(function (error, productTypes) {
      if (error) {
        return response.serverError(error);
      }

      return response.send(200, {
        code: 'successful',
        productTypes: productTypes
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

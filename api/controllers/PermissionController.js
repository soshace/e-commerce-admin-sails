/**
 * PermissionController
 *
 * @description :: Server-side logic for managing permissions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var _ = require('underscore'),
  adminsOnly = require('../services/CompanyService').adminsOnly;

module.exports = {
  /**
   * @deprecated
   *
   * @param request
   * @param response
   */
  find: function (request, response) {
    var user = request.user,
      userId = user.id;


    Permission.find({owner: userId}).exec(function (error, permissions) {
      if (error) {
        return response.send(500, {
          code: 'error',
          message: error
        });
      }

      return response.send(200, {
        code: 'successful',
        permissions: permissions
      });
    });
  },

  update: function (request, response) {
    var permissionData = request.body || {},
      permissionId = request.param('id'),
      user = request.user,
      userId = user.id;

    Permission.findOne({id: permissionId}).exec(function (error, permission) {
      if (error) {
        return response.serverError(error);
      }

      if (permission.admin) {
        return response.send(403, {
          code: 'not.allowed',
          message: 'Admin permissions are not allowed to update'
        })
      }

      if (_.isEmpty(permission)) {
        return response.send(404, {
          code: 'not.found',
          message: 'Product attribute not found'
        });
      }

      Project.findOne({id: permission.project}).exec(function (err, project) {
        Company.findOne({id: project.company}).populate('teams').exec(function (error, company) {
          adminsOnly(response, company.teams, userId, function () {
            _.extend(permission, permissionData);

            permission.save(function (error, updatedPermission) {
              if (error) {
                return response.send(500, {
                  code: 'error',
                  message: error
                });
              }

              updatedPermission.project = updatedPermission.project.id;
              updatedPermission.team = updatedPermission.team.id;
              response.send(200, {
                code: 'successful',
                message: 'Permission was successfully updated',
                permission: updatedPermission
              });
            });

          });
        });
      })

    });
  }
};


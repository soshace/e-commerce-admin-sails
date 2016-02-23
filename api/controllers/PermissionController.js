/**
 * PermissionController
 *
 * @description :: Server-side logic for managing permissions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var _ = require('underscore');

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

    Permission.findOne({id: permissionId}).populate('members').exec(function (error, permission) {
      var hasAccess = false;

      if (error) {
        return response.serverError(error);
      }

      if (_.isEmpty(permission)) {
        return response.send(404, {
          code: 'not.found',
          message: 'Product attribute not found'
        });
      }

      _.each(permission.members, function (member) {
        if (member.id === userId) {
          hasAccess = true;
        }
      });

      if (!hasAccess) {
        return response.send(403, {
          code: 'access.denied',
          message: 'Access denied'
        });
      }

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
  }
};


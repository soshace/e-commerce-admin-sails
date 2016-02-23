/**
 * PermissionController
 *
 * @description :: Server-side logic for managing permissions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

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
      permission = request.permission || {};

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
  }
};


var async = require('async'),
  _ = require('underscore');

module.exports = {
  getPermissionsByProject: function (userId, projectId, callback) {
    async.waterfall([
      function (callback) {
        Project.findOne({id: projectId}).exec(callback);
      },
      function (project, callback) {
        var isOwner = project.owner = userId;

        if (isOwner) {
          return callback(null, {
            isOwner: true
          });
        }

        User.findOne({id: userId}).populate('permissions').exec(function (error, user) {
          var permissions,
            projectPermission;

          if (error) {
            return callback(error);
          }

          permissions = user.permissions;

          _.each(permissions, function (permission) {
            if (permission.project === projectId) {
              projectPermission = permission;
            }
          });

          projectPermission.isOwner = false;
          callback(null, projectPermission);
        })
      }
    ], callback);
  },

  getPermissionByUser: function (userId, permissions) {
    var permissionByUser;

    _.each(permissions, function (permission) {
      if (permission.members.indexOf(userId) !== -1) {
        permissionByUser = permission;
      }
    });

    return permissionByUser;
  },

  /**
   * We are checking permissions of the project
   * Does user has access to the project by one permission?
   *
   * @returns {boolean}
   */
  accessByOnePermission: function (userId, permissions) {
    var permission = this.getPermissionByUser.call(arguments);

    if (typeof permission === 'undefined') {
      return false;
    }

    return permission.isOwner ||
      permission.productsPermission !== 'none' ||
      permission.ordersPermission !== 'none' ||
      permission.customersPermission !== 'none';
  }
};

var _ = require('underscore');

module.exports = {
  getPermissionsByProject: function (userId, projectId, callback) {
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

      callback(null, projectPermission);
    })
  }
};

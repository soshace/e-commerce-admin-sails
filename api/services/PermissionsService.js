var async = require('async'),
  _ = require('underscore');

module.exports = {
  adminsOnly: function (user, project, callback) {
    Team
      .findOne({company: project.company, admin: true})
      .populate('members')
      .exec(function (err, team) {
        var member = _.findWhere(team.members, {id: user.id});
        if (member) {
          callback(null)
        } else {
          callback({
            code: 'access.denied',
            message: 'Access denied'
          })
        }
      })
  },

  getPermissionsByProject: function (userId, projectId, callback) {
    async.waterfall([
      function (callback) {
        Project.findOne({id: projectId}).exec(function (error, project) {
          if (error) {
            return callback(error);
          }

          if (typeof project === 'undefined') {
            return callback({
              code: 'not.found',
              message: 'project not found'
            });
          }

          callback(null, project);
        });
      },
      function (project, callback) {
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
    ], callback);
  },

  getPermissionByUser: function (userId, permissions) {
    var permissionByUser;

    sails.log('-------getPermissionByUser userId----', userId);
    _.each(permissions, function (permission) {
      if (_.pluck(permission.members, 'id').indexOf(userId) !== -1) {
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
    var permission = this.getPermissionByUser(userId, permissions);

    if (typeof permission === 'undefined') {
      return false;
    }

    return permission.admin ||
      permission.productsPermission !== 'none' ||
      permission.ordersPermission !== 'none' ||
      permission.customersPermission !== 'none';
  }
};

/**
 * Checking if user have enough rights access to the category or not
 */

module.exports = function (request, response, next) {
  var permissionsId = request.param('id'),
    profile = request.user,
    profileId = profile.id;

  if (typeof permissionsId === 'undefined') {
    return response.send(400, {
      code: 'error',
      message: 'You should specify product attribute\'s id'
    });
  }

  Permission.findOne({id: permissionsId}).exec(function (error, permission) {
    if (error) {
      return response.send(500, {
        code: 'error',
        message: error
      });
    }

    if (typeof permission === 'undefined') {
      return response.send(400, {
        code: 'not.found',
        message: 'Permission was not found'
      });
    }

    if (profileId !== permission.owner) {
      return response.send(403, {
        code: 'no.access',
        message: 'You don\'t have access to the resource'
      });
    }

    request.permission = permission;
    next();
  });
};

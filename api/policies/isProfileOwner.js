/**
 * Checking if user is owner of the profile or not
 */
module.exports = function (request, response, next) {
  var params = request.param(),
    profile = request.user;

  if (params.id !== profile.id) {
    return response.send(403, {
      code: 'no.access',
      message: 'You don\'t have access to the resource'
    });
  }

  next();
};

/**
 * Checking if user is owner of the profile or not
 */
module.exports = function (request, response, next) {
  var userId = request.param('id'),
    profile = request.user,
    profileId = profile && profile.id;

  if (userId !== profileId) {
    return response.send(403, {
      code: 'no.access',
      message: 'You don\'t have access to the resource'
    });
  }

  next();
};

/**
 * Checking if user's permissions of project
 */
module.exports = function (request, response, next) {
  var profile = request.user,
    profileId = profile.id;

  User.findOne({id: profileId}).populate('teams').exec(function (error, user) {
    if (error) {
      return response.serverError(error);
    }
  });
};

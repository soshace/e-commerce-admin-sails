/**
 * Checking if user is owner of the team or not
 */
module.exports = function (request, response, next) {
  var teamId = request.param('id'),
    profile = request.user,
    profileId = profile && profile.id;

  if (typeof teamId === 'undefined') {
    return response.send(400, {
      code: 'error',
      message: 'You should specify company\'s id'
    });
  }

  Team.findOne({id: teamId}).exec(function (error, team) {
    if (error) {
      return response.send(500, {
        code: 'error',
        message: error
      });
    }

    if (typeof team === 'undefined') {
      return response.send(400, {
        code: 'not.found',
        message: 'Team was not found'
      });
    }

    if (profileId !== team.owner) {
      return response.send(403, {
        code: 'no.access',
        message: 'You don\'t have access to the resource'
      });
    }

    request.team = team;
    next();
  });
};

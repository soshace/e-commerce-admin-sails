/**
 * Checking if user is owner of the project or not
 */
module.exports = function (request, response, next) {
  var projectId = request.param('id'),
    profile = request.user,
    profileId = profile.id;

  if (typeof projectId === 'undefined') {
    return response.send(400, {
      code: 'error.identificator.not.found',
      message: 'You should specify project\'s id'
    });
  }

  Project.findOne({id: projectId}).exec(function (error, project) {
    if (error) {
      return response.send(500, {
        code: 'error',
        message: error
      });
    }

    if (profileId !== project.owner) {
      return response.send(403, {
        code: 'no.access',
        message: 'You don\'t have access to the resource'
      });
    }

    request.project = project;
    next();
  });
};

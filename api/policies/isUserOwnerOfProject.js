/**
 * Checking if user have enough rights access to the project or not
 */
module.exports = function (request, response, next) {
  var projectId = request.param('id'),
    profile = request.user,
    profileId = profile.id;

  if (typeof projectId === 'undefined') {
    return response.send(400, {
      code: 'error',
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

    if (typeof project === 'undefined') {
      return response.send(400, {
        code: 'not.found',
        message: 'Project was not found'
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

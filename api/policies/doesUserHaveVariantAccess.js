/**
 * TODO: Need to check attribute permissions + if user is owner
 * TODO: Currently we are checking only if he is owner or not
 * Checking if user have enough rights access to the category or not
 */

module.exports = function (request, response, next) {
  var categoryId = request.param('id'),
    profile = request.user,
    profileId = profile.id;

  if (typeof categoryId === 'undefined') {
    return response.send(400, {
      code: 'error',
      message: 'You should specify variant\'s id'
    });
  }

  Variant.findOne({id: categoryId}).exec(function (error, variant) {
    if (error) {
      return response.send(500, {
        code: 'error',
        message: error
      });
    }

    if (typeof variant === 'undefined') {
      return response.send(400, {
        code: 'not.found',
        message: 'Variant was not found'
      });
    }

    if (profileId !== variant.owner) {
      return response.send(403, {
        code: 'no.access',
        message: 'You don\'t have access to the resource'
      });
    }

    request.variant = variant;
    next();
  });
};

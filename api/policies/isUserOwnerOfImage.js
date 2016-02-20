/**
 * Checking if user have enough rights access to the image or not
 */

module.exports = function (request, response, next) {
  var imageId = request.param('id'),
    profile = request.user,
    profileId = profile.id;

  if (typeof imageId === 'undefined') {
    return response.send(400, {
      code: 'error',
      message: 'You should specify image\'s id'
    });
  }

  Image.findOne({id: imageId}).exec(function (error, image) {
    if (error) {
      return response.send(500, {
        code: 'error',
        message: error
      });
    }

    if (typeof image === 'undefined') {
      return response.send(400, {
        code: 'not.found',
        message: 'Image was not found'
      });
    }

    if (profileId !== image.owner) {
      return response.send(403, {
        code: 'no.access',
        message: 'You don\'t have access to the resource'
      });
    }

    request.image = image;
    next();
  });
};

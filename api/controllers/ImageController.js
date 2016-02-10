/**
 * ImageController
 *
 * @description :: Server-side logic for managing images
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  //TODO: need to check if user have access to image by project access
  create: function (request, response) {
    var imageData = request.body,
      profile = request.user;

    imageData.owner = profile.id;
    Image.create(imageData).exec(function (error, image) {
      if (error) {
        return response.send(500, {
          code: 'error',
          message: error
        });
      }

      response.send(200, {
        code: 'successful',
        image: image
      });
    });
  },

  update: function (request, response) {
    var imageData = request.body,
      image = request.image || {};

    _.extend(image, imageData);

    image.save(function (error, image) {
      var returnedImage;

      if (error) {
        return response.send(500, {
          code: 'error',
          message: error
        });
      }

      returnedImage = _.pick(image, 'id', 'createdAt', 'updatedAt', 'isMaster', 'productType', 'product', 'sku');
      response.send(200, {
        code: 'successful',
        message: 'Image was successfully updated',
        image: returnedImage
      });
    });
  },

  findOne: function (request, response) {
    var imageId = request.image.id;

    Image.findOne({id: imageId}).populate('attributes').exec(function (error, image) {
      if (error) {
        return response.send(500, {
          code: 'error',
          message: error
        });
      }

      response.send(200, {
        code: 'successful',
        message: 'Image was successfully found',
        image: image
      });
    });
  },

  remove: function (request, response) {
    var imageId = request.param('id');

    Image.destroy({id: imageId})
      .exec(function (error, image) {
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

        response.send(200, {
          code: 'successful',
          message: 'Image was removed successfully',
          image: image
        });
      });
  },

  //TODO: need to include products which user has rights access
  find: function (request, response) {
    var user = request.user,
      userId = user.id;

    Image.find({owner: userId}).exec(function (error, images) {
      if (error) {
        return response.send(500, {
          code: 'error',
          message: error
        });
      }

      return response.send(200, {
        code: 'successful',
        images: images
      });
    });
  }
};


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
    imageData.external = true;
    Image.create(imageData).exec(function (error, image) {
      if (error) {
        return response.serverError(error);
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
      if (error) {
        return response.serverError(error);
      }

      response.send(200, {
        code: 'successful',
        message: 'Image was successfully updated',
        image: image
      });
    });
  },

  findOne: function (request, response) {
    var imageId = request.image.id;

    Image.findOne({id: imageId}).exec(function (error, image) {
      if (error) {
        return response.serverError(error);
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
          return response.serverError(error);
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
        return response.serverError(error);
      }

      return response.send(200, {
        code: 'successful',
        images: images
      });
    });
  },

  //TODO: need to check if user have access to product and variant
  upload: function (request, response) {
    var requestData = request.body,
      variantId = requestData.variantId,
      productId = requestData.productId;

    async.waterfall([
      function (callback) {
        request.file('avatar').upload({
          dirname: sails.config.images.uploadFolder,
          maxBytes: 5000000
        }, callback);
      },
      function (files, callback) {
        var fileName,
          fileURI,
          filePath,
          image = files && files[0];

        if (!image) {
          return callback('File wasn\'t found');
        }

        filePath = image.fd;
        fileName = filePath.replace(sails.config.images.uploadFolder, '');
        fileURI = sails.config.images.imagesRootURI + fileName;

        Image.create({
          uri: fileURI,
          product: productId,
          variant: variantId,
          owner: request.user.id
        }).exec(callback);
      }
    ], function (error, image) {
      if (error) {
        return response.serverError(error);
      }

      return response.send(200, {
        message: 'successful',
        image: image
      });
    });
  }
};


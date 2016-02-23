/**
 * ImageController
 *
 * @description :: Server-side logic for managing images
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var _ = require('underscore');

module.exports = {
  //TODO: need to check if user have access to image by project access
  create: function (request, response) {
    var imageData = request.body,
      variantId = imageData.variant,
      user = request.user,
      userId = user.id;

    if (typeof variantId === 'undefined') {
      return response.send(404, {
        code: 'not.found',
        message: 'You need to specify variant id'
      });
    }

    Variant.findOne({id: variantId}).exec(function (error, variant) {
      var projectId;

      if (error) {
        return response.serverError(error);
      }

      if(typeof variant === 'undefined'){
        return response.send(404, {
          code: 'not.found',
          message: 'variant was not found'
        });
      }

      projectId = variant.project;
      PermissionsService.getPermissionsByProject(userId, projectId, function (error, permission) {
        var isAdmin,
          managerOfProducts;

        if (error) {
          return response.serverError(error);
        }

        isAdmin = permission.admin;
        managerOfProducts = permission.productsPermission === 'manage';
        if (!isAdmin && !managerOfProducts) {
          return response.send(403, {
            code: 'access.denied',
            message: 'Access denied'
          });
        }

        imageData.owner = userId;
        imageData.external = true;
        imageData.project  = projectId;
        Image.create(imageData).exec(function (error, image) {
          if (error) {
            return response.serverError(error);
          }

          response.send(200, {
            code: 'successful',
            image: image
          });
        });
      });
    });
  },

  update: function (request, response) {
    var imageData = request.body,
      imageId = request.param('id'),
      user = request.user,
      userId = user.id;

    Image.findOne({id: imageId}).exec(function (error, image) {
      var projectId;

      if (error) {
        return response.serverError(error);
      }

      projectId = image.project;
      PermissionsService.getPermissionsByProject(userId, projectId, function (error, permission) {
        var isAdmin,
          managerOfProducts;

        if (error) {
          return response.serverError(error);
        }

        isAdmin = permission.admin;
        managerOfProducts = permission.productsPermission === 'manage';
        if (!isAdmin && !managerOfProducts) {
          return response.send(403, {
            code: 'access.denied',
            message: 'Access denied'
          });
        }

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
      });
    });
  },

  /**
   * @deprecated
   *
   * @param request
   * @param response
   */
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
    var imageId = request.param('id'),
      user = request.user,
      userId = user.id;

    Image.findOne({id: imageId}).exec(function (error, image) {
      var projectId;

      if (error) {
        return response.serverError(error);
      }

      if(_.isEmpty(image)){
        return response.send(404, {
          code: 'not.found',
          message: 'Image not found'
        });
      }

      projectId = image.project;
      sails.log('------ImageController remove------', image);
      PermissionsService.getPermissionsByProject(userId, projectId, function (error, permission) {
        var isAdmin,
          managerOfProducts;

        if (error) {
          return response.serverError(error);
        }

        isAdmin = permission.admin;
        managerOfProducts = permission.productsPermission === 'manage';
        if (!isAdmin && !managerOfProducts) {
          return response.send(403, {
            code: 'access.denied',
            message: 'Access denied'
          });
        }

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
      });
    });
  },

  /**
   * @deprecated
   *
   * @param request
   * @param response
   */
  //TODO: need to include images which user has rights access
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
    request.file('image').upload({
      dirname: sails.config.images.uploadFolder,
      maxBytes: 5000000
    }, function (error, files) {
      var fileName,
        fileURI,
        filePath,
        image;

      if (error) {
        return response.serverError(error);
      }

      image = files && files[0];
      if (!image) {
        return callback('File wasn\'t found');
      }


      sails.log('ImageController upload image', image);
      filePath = image.fd;
      fileName = filePath.replace(sails.config.images.uploadFolder, '');
      fileURI = sails.config.images.imagesRootURI + fileName;

      response.send(200, {
        message: 'successful',
        image: {
          uri: fileURI
        }
      });
    });
  }
};


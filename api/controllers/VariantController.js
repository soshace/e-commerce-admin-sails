/**
 * VariantController
 *
 * @description :: Server-side logic for managing Variants
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var _ = require('underscore');

module.exports = {
  //TODO: need to check if user have access to variant by project access
  create: function (request, response) {
    var variantData = request.body,
      productId = variantData.product,
      user = request.user,
      userId = user.id;

    Product.findOne({id: productId}).exec(function (error, product) {
      var projectId;

      if (error) {
        return response.serverError(error);
      }

      projectId = product.project;
      PermissionsService.getPermissionsByProject(userId, projectId, function (error, permission) {
        var isOwner,
          managerOfProducts;

        if (error) {
          return response.serverError(error);
        }

        isOwner = permission.isOwner;
        managerOfProducts = permission.productsPermission === 'manage';
        if (!isOwner && !managerOfProducts) {
          return response.send(403, {
            code: 'access.denied',
            message: 'Access denied'
          });
        }

        variantData.owner = userId;
        variantData.project = projectId;
        variantData.product = productId;
        variantData.productType = product.productType;
        Variant.create(variantData).exec(function (error, variant) {
          if (error) {
            return response.send(500, {
              code: 'error',
              message: error
            });
          }

          response.send(200, {
            code: 'successful',
            variant: variant
          });
        });
      });
    });
  },

  updateSKU: function (request, response) {
    var variantSKU = request.body && request.body.sku,
      variantId = request.param('id'),
      user = request.user,
      userId = user.id;

    Variant.findOne({id: variantId}).exec(function (error, variant) {
      var projectId;

      if (error) {
        return response.serverError(error);
      }

      projectId = variant.project;
      PermissionsService.getPermissionsByProject(userId, projectId, function (error, permission) {
        var isOwner,
          managerOfProducts;

        if (error) {
          return response.serverError(error);
        }

        isOwner = permission.isOwner;
        managerOfProducts = permission.productsPermission === 'manage';
        if (!isOwner && !managerOfProducts) {
          return response.send(403, {
            code: 'access.denied',
            message: 'Access denied'
          });
        }

        _.extend(variant, {sku: variantSKU});

        variant.save(function (error, variant) {
          var returnedVariant;

          if (error) {
            return response.send(500, {
              code: 'error',
              message: error
            });
          }

          returnedVariant = _.pick(variant, 'id', 'createdAt', 'updatedAt', 'isMaster', 'productType', 'product', 'sku');
          response.send(200, {
            code: 'successful',
            message: 'Product was successfully updated',
            variant: returnedVariant
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
    var variantId = request.variant.id;

    Variant.findOne({id: variantId})
      .populate('attributes')
      .exec(function (error, variant) {
        if (error) {
          return response.send(500, {
            code: 'error',
            message: error
          });
        }

        response.send(200, {
          code: 'successful',
          message: 'Variant was successfully found',
          variant: variant
        });
      });
  },

  remove: function (request, response) {
    var variantId = request.param('id'),
      user = request.user,
      userId = user.id;

    Variant.findOne({id: variantId}).exec(function (error, variant) {
      var projectId;

      if (error) {
        return response.serverError(error);
      }

      projectId = variant.project;
      PermissionsService.getPermissionsByProject(userId, projectId, function (error, permission) {
        var isOwner,
          managerOfProducts;

        if (error) {
          return response.serverError(error);
        }

        isOwner = permission.isOwner;
        managerOfProducts = permission.productsPermission === 'manage';
        if (!isOwner && !managerOfProducts) {
          return response.send(403, {
            code: 'access.denied',
            message: 'Access denied'
          });
        }

        Variant.destroy({id: variantId})
          .exec(function (error, variant) {
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

            response.send(200, {
              code: 'successful',
              message: 'Variant was removed successfully',
              variant: variant
            });
          });
      });
    });
  },

  //TODO: need to include products which user has rights access
  /**
   * @deprecated
   *
   * @param request
   * @param response
   */
  find: function (request, response) {
    var user = request.user,
      userId = user.id;

    Variant.find({owner: userId}).exec(function (error, variants) {
      if (error) {
        return response.send(500, {
          code: 'error',
          message: error
        });
      }

      return response.send(200, {
        code: 'successful',
        variants: variants
      });
    });
  },

  /**
   * @deprecated
   *
   * @param request
   * @param response
   */
  getImages: function (request, response) {
    var variantId = request.param('id');

    Image.find({variant: variantId}).exec(function (error, images) {
      if (error) {
        return response.serverError(error);
      }

      return response.send(200, {
        code: 'successful',
        images: images
      });
    });
  },

  /**
   * @deprecated
   *
   * @param request
   * @param response
   */
  getPrices: function (request, response) {
    var variantId = request.param('id');

    Price.find({variant: variantId}).exec(function (error, prices) {
      if (error) {
        return response.serverError(error);
      }

      return response.send(200, {
        code: 'successful',
        prices: prices
      });
    });
  }
};


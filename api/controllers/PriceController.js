/**
 * PriceController
 *
 * @description :: Server-side logic for managing Prices
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var _ = require('underscore');

module.exports = {
  create: function (request, response) {
    var priceData = request.body,
      variantId = priceData.variant,
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

        priceData.owner = userId;
        priceData.project = projectId;
        Price.create(priceData).exec(function (error, price) {
          if (error) {
            return response.send(500, {
              code: 'error',
              message: error
            });
          }

          response.send(200, {
            code: 'successful',
            price: price
          });
        });
      });
    });
  },

  update: function (request, response) {
    var priceData = request.body,
      priceId = request.param('id'),
      user = request.user,
      userId = user.id;

    Price.findOne({id: priceId}).exec(function (error, price) {
      var projectId;

      if (error) {
        return response.serverError(error);
      }

      projectId = price.project;
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

        _.extend(price, priceData);

        price.save(function (error, price) {
          if (error) {
            return response.send(500, {
              code: 'error',
              message: error
            });
          }

          response.send(200, {
            code: 'successful',
            message: 'Price was successfully updated',
            price: price
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
  //TODO: need to include prices which user has rights access
  find: function (request, response) {
    var user = request.user,
      userId = user.id;

    Price.find({owner: userId}).exec(function (error, prices) {
      if (error) {
        return response.serverError(error);
      }

      return response.send(200, {
        code: 'successful',
        prices: prices
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
    response.send(200, {
      code: 'successful',
      message: 'Price was successfully found',
      price: request.price
    });
  },

  remove: function (request, response) {
    var priceId = request.param('id'),
      user = request.user,
      userId = user.id;

    Price.findOne({id: priceId}).exec(function (error, price) {
      var projectId;

      if (error) {
        return response.serverError(error);
      }

      projectId = price.project;
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

        Price.destroy({id: priceId})
          .exec(function (error, price) {
            if (error) {
              return response.send(500, {
                code: 'error',
                message: error
              });
            }

            if (typeof price === 'undefined') {
              return response.send(400, {
                code: 'not.found',
                message: 'Price was not found'
              });
            }

            response.send(200, {
              code: 'successful',
              message: 'Price was removed successfully',
              price: price
            });
          });
      });
    });
  }
};


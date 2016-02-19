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
      profile = request.user;

    priceData.owner = profile.id;
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
  },

  update: function (request, response) {
    var priceData = request.body || {},
      price = request.price || {};

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
    var priceId = request.param('id');

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
  }
};


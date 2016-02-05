/**
 * ProductController
 *
 * @description :: Server-side logic for managing Products
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var _ = require('underscore');

module.exports = {

  create: function (request, response) {
    var productData = request.body,
      profile = request.user;

    productData.owner = profile.id;
    Product.create(productData).exec(function (error, project) {
      if (error) {
        return response.send(500, {
          code: 'error',
          message: error
        });
      }

      response.send(200, {
        code: 'successful',
        project: project
      });
    });
  },

  update: function (request, response) {
    var productData = request.body || {},
      product = request.product || {};

    _.extend(product, productData);

    product.save(function (error, product) {
      var returnedProduct;

      if (error) {
        return response.send(500, {
          code: 'error',
          message: error
        });
      }

      returnedProduct = _.pick(product, 'id', 'name', 'createdAt', 'updatedAt');
      response.send(200, {
        code: 'successful',
        message: 'Product was successfully updated',
        product: returnedProduct
      });
    });
  },

  findOne: function (request, response) {
    response.send(200, {
      code: 'successful',
      message: 'Product was successfully found',
      project: request.product
    });
  },

  remove: function (request, response) {
    var productId = request.param('id');

    Product.destroy({id: productId})
      .exec(function (error, product) {
        if (error) {
          return response.send(500, {
            code: 'error',
            message: error
          });
        }

        if (typeof product === 'undefined') {
          return response.send(400, {
            code: 'not.found',
            message: 'Product was not found'
          });
        }

        response.send(200, {
          code: 'successful',
          message: 'Product was removed successfully',
          product: product
        });
      });
  },

  //TODO: need to include products which user has rights access
  find: function (request, response) {
    var user = request.user,
      userId = user.id;

    User.findOne({id: userId}).exec(function (error, products) {
      if (error) {
        return response.send(500, {
          code: 'error',
          message: error
        });
      }

      return response.send(200, {
        code: 'successful',
        products: products
      });
    });
  }
};


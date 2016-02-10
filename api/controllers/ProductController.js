/**
 * ProductController
 *
 * @description :: Server-side logic for managing Products
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var _ = require('underscore');

module.exports = {

  //TODO: need to check that ProductType and Project exist
  //TODO: need to check that productType is tied with Project
  //TODO: user should have access to project
  create: function (request, response) {
    var productData = request.body,
      profile = request.user;

    productData.owner = profile.id;
    Product.create(productData).exec(function (error, product) {
      if (error) {
        return response.send(500, {
          code: 'error',
          message: error
        });
      }

      response.send(200, {
        code: 'successful',
        product: product
      });
    });
  },

  //TODO: need to check that ProductType and Project exist
  //TODO: need to check that productType is tied with Project
  //TODO: user should have access to project
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
    var productId = request.product.id;

    Product.findOne({id: productId}).populate('categories').exec(function (error, product) {
      response.send(200, {
        code: 'successful',
        message: 'Product was successfully found',
        product: product
      });
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
      userId = user.id,
      requestObj = {owner: userId},
      query = request.query || {},
      paginate = {},
      findResults;

    if (query.page) {
      paginate.page = query.page;
    }

    if (query.limit) {
      paginate.limit = query.limit;
    }

    if (query.name) {
      requestObj.name = query.name;
    }

    findResults = Product.find(requestObj);

    if (!_.isEmpty(paginate)) {
      findResults = findResults.paginate(paginate);
    }

    findResults.exec(function (error, products) {
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
  },

  getCategories: function (request, response) {
    var productId = request.param('id');

    Product.findOne({id: productId}).populate('categories').exec(function (error, product) {
      var categories;

      if (error) {
        return response.send(500, {
          code: 'error',
          message: error
        });
      }

      categories = product.categories || [];
      return response.send(200, {
        code: 'successful',
        categories: categories
      });
    });
  },

  addCategory: function (request, response) {
    var categoryId = request.param('categoryId'),
      product = request.product;

    product.categories.add(categoryId);
    product.save(function (error, product) {
      if (error) {
        return response.send(500, {
          code: 'error',
          message: error
        });
      }

      return response.send(200, {
        code: 'successful',
        product: product
      });
    });
  },

  removeCategory: function (request, response) {
    var categoryId = request.param('categoryId'),
      product = request.product;

    product.categories.remove(categoryId);
    product.save(function (error, product) {
      if (error) {
        return response.send(500, {
          code: 'error',
          message: error
        });
      }

      return response.send(200, {
        code: 'successful',
        product: product
      });
    });
  }
};


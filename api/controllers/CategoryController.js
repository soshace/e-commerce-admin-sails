/**
 * CategoryController
 *
 * @description :: Server-side logic for managing categories
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var _ = require('underscore');

module.exports = {
  create: function (request, response) {
    var categoryData = request.body,
      profile = request.user;

    categoryData.owner = profile.id;
    Category.create(categoryData).exec(function (error, category) {
      if (error) {
        return response.send(500, {
          code: 'error',
          message: error
        });
      }

      response.send(200, {
        code: 'successful',
        category: category
      });
    });
  },

  update: function (request, response) {
    var categoryData = request.body || {},
      category = request.category || {};

    _.extend(category, categoryData);

    category.save(function (error, category) {
      var returnedCategory;

      if (error) {
        return response.send(500, {
          code: 'error',
          message: error
        });
      }

      returnedCategory = _.pick(category, 'id', 'name', 'createdAt', 'updatedAt');
      response.send(200, {
        code: 'successful',
        message: 'Category was successfully updated',
        category: returnedCategory
      });
    });
  },

  findOne: function (request, response) {
    response.send(200, {
      code: 'successful',
      message: 'Category was successfully found',
      category: request.category
    });
  },

  remove: function (request, response) {
    var categoryId = request.param('id');

    Category.destroy({id: categoryId})
      .exec(function (error, category) {
        if (error) {
          return response.send(500, {
            code: 'error',
            message: error
          });
        }

        if (typeof category === 'undefined') {
          return response.send(400, {
            code: 'not.found',
            message: 'Category was not found'
          });
        }

        response.send(200, {
          code: 'successful',
          message: 'Category was removed successfully',
          category: category
        });
      });
  },

  find: function (request, response) {
    var user = request.user,
      userId = user.id;

    Category.find({owner: userId}).exec(function (error, categories) {
      if (error) {
        return response.send(500, {
          code: 'error',
          message: error
        });
      }

      return response.send(200, {
        code: 'successful',
        categories: categories
      });
    });
  },

  getProducts: function (request, response) {
    var categoryId = request.param('id'),
      requestObj = {},
      query = request.query || {};

    if (query.page) {
      requestObj.skip = PaginationService.getSkipNumberByPageAndLimit(query.page, query.limit);
      sails.log('----skip---', requestObj.skip);
    }

    if (query.limit) {
      requestObj.limit = query.limit;
    }

    if (query.name) {
      requestObj.name = query.name;
    }

    Category.findOne({id: categoryId}).populate('products', requestObj).exec(function (error, category) {
      var products;

      if (error) {
        return response.send(500, {
          code: 'error',
          message: error
        });
      }

      products = category.products || [];
      return response.send(200, {
        code: 'successful',
        products: products
      });
    });
  },

  addProduct: function (request, response) {
    var productId = request.param('productId'),
      category = request.category;

    category.products.add(productId);
    category.save(function (error, category) {
      if (error) {
        return response.send(500, {
          code: 'error',
          message: error
        });
      }

      return response.send(200, {
        code: 'successful',
        category: category
      });
    });
  },

  removeProduct: function (request, response) {
    var productId = request.param('productId'),
      category = request.category;

    category.products.remove(productId);
    category.save(function (error, category) {
      if (error) {
        return response.send(500, {
          code: 'error',
          message: error
        });
      }

      return response.send(200, {
        code: 'successful',
        category: category
      });
    });
  }
};

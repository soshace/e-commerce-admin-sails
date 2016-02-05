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
  }
};

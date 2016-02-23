/**
 * CategoryController
 *
 * @description :: Server-side logic for managing categories
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var _ = require('underscore');

module.exports = {
  create: function (request, response) {
    var user = request.user,
      userId = user.id,
      categoryData = request.body,
      projectId = categoryData.project;

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
    });
  },

  update: function (request, response) {
    var categoryId = request.param('id'),
      user = request.user,
      userId = user.id,
      categoryData = request.body;

    Category.findOne({id: categoryId}).exec(function (error, category) {
      var projectId;

      if (error) {
        return response.serverError(error);
      }

      if (typeof category === 'undefined') {
        return response.send(200, {
          code: 'not.found',
          message: 'category not found'
        });
      }

      projectId = category.project;
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
      });
    });
  },

  findOne: function (request, response) {
    var categoryId = request.param('id'),
      user = request.user,
      userId = user.id;

    Category.findOne({id: categoryId}).exec(function (error, category) {
      var projectId;

      if (error) {
        return response.serverError(error);
      }

      if (typeof category === 'undefined') {
        return response.send(200, {
          code: 'not.found',
          message: 'category not found'
        });
      }

      projectId = category.project;
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

        response.send(200, {
          code: 'successful',
          message: 'Category was successfully found',
          category: category
        });
      });
    });
  },

  remove: function (request, response) {
    var categoryId = request.param('id'),
      user = request.user,
      userId = user.id;

    Category.findOne({id: categoryId}).exec(function (error, category) {
      var projectId;

      if (error) {
        return response.serverError(error);
      }

      if (typeof category === 'undefined') {
        return response.send(200, {
          code: 'not.found',
          message: 'category not found'
        });
      }

      projectId = category.project;
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
      });
    });
  },

  /**
   * @deprecated
   *
   * @param request
   * @param response
   */
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
    var user = request.user,
      userId = user.id,
      categoryId = request.param('id'),
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
      var projectId,
        products;

      if (error) {
        return response.send(500, {
          code: 'error',
          message: error
        });
      }


      projectId = category.project;
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

        products = category.products || [];
        return response.send(200, {
          code: 'successful',
          products: products
        });
      });
    });
  },

  //TODO: need to check product permissions
  addProduct: function (request, response) {
    var productId = request.param('productId'),
      categoryId = request.param('id'),
      user = request.user,
      userId = user.id;

    Category.findOne({id: categoryId}).exec(function (error, category) {
      var projectId;

      if (error) {
        return response.send(500, {
          code: 'error',
          message: error
        });
      }

      if (typeof category === 'undefined') {
        return response.send(404, {
          code: 'not.found',
          message: 'Category not found'
        });
      }


      projectId = category.project;
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
      });
    });
  },

  //TODO: need to check product permissions
  removeProduct: function (request, response) {
    var productId = request.param('productId'),
      categoryId = request.param('id'),
      user = request.user,
      userId = user.id;

    Category.findOne({id: categoryId}).exec(function (error, category) {
      var projectId;

      if (error) {
        return response.send(500, {
          code: 'error',
          message: error
        });
      }

      if (typeof category === 'undefined') {
        return response.send(404, {
          code: 'not.found',
          message: 'Category not found'
        });
      }

      projectId = category.project;
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
      });
    });
  }
};

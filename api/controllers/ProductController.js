/**
 * ProductController
 *
 * @description :: Server-side logic for managing Products
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var _ = require('underscore'),
  async = require('async');

module.exports = {

  create: function (request, response) {
    var user = request.user,
      userId = user.id,
      productData = request.body,
      productTypeId = productData.productType,
      projectId = productData.project;

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

      ProductType.findOne({id: productTypeId}).exec(function (error, productType) {
        if (error) {
          return response.serverError(error);
        }

        if (typeof productType === 'undefined') {
          return response.send(404, {
            code: 'not.found',
            message: 'Product Type with current id was not found'
          });
        }

        if (productType.project !== projectId) {
          return response.send(403, {
            code: 'permission denied',
            message: 'Product Type doesn\'t belong to the project'
          });
        }

        sails.log('-----------Product Controller productType 2----------');
        Product.create(productData).exec(function (error, product) {
          if (error) {
            return response.serverError(error);
          }

          response.send(200, {
            code: 'successful',
            product: product
          });
        });
      });
    });
  },

  update: function (request, response) {
    var user = request.user,
      userId = user.id,
      productData = request.body || {},
      productId = request.param('id');


    Product.findOne({id: productId}).exec(function (error, product) {
      var projectId;

      if (error) {
        return response.serverError(error);
      }

      if (typeof  product === 'undefined') {
        return response.send(404, {
          code: 'not.found',
          message: 'Product not found'
        });
      }

      projectId = product.project;
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

        productData = _.pick(productData, 'name', 'description');
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
      });
    });
  },

  findOne: function (request, response) {
    var user = request.user,
      userId = user.id,
      productId = request.param('id');

    Product.findOne({id: productId})
      .populate('categories')
      .populate('variants')
      .exec(function (error, product) {
        var projectId = product.project;

        if (typeof product === 'undefined') {
          return response.send(404, {
            code: 'not.found',
            message: 'Product with current id was not found'
          });
        }

        sails.log('-------- Product Controller product--------', product);
        PermissionsService.getPermissionsByProject(userId, projectId, function (error, permission) {
          var isAdmin,
            hasAccessToProduct;

          if (error) {
            return response.serverError(error);
          }

          isAdmin = permission.admin;
          hasAccessToProduct = permission.productsPermission !== 'none';
          if (!isAdmin && !hasAccessToProduct) {
            return response.send(403, {
              code: 'access.denied',
              message: 'Access denied'
            });
          }

          response.send(200, {
            code: 'successful',
            message: 'Product was successfully found',
            product: product
          });
        });
      });
  },

  remove: function (request, response) {
    var user = request.user,
      userId = user.id,
      productId = request.param('id');

    Product.findOne({id: productId})
      .populate('categories')
      .populate('variants')
      .exec(function (error, product) {
        var projectId;

        if (typeof product === 'undefined') {
          return response.send(400, {
            code: 'not.found',
            message: 'Product was not found'
          });
        }

        projectId = product.project;

        sails.log('-------- Product Controller product--------', product);
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

          Product.destroy({id: productId})
            .exec(function (error, product) {
              if (error) {
                return response.send(500, {
                  code: 'error',
                  message: error
                });
              }

              response.send(200, {
                code: 'successful',
                message: 'Product was removed successfully',
                product: product
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

  /**
   * @deprecated
   *
   * @param request
   * @param response
   */
  getCategories: function (request, response) {
    var user = request.user,
      userId = user.id,
      productId = request.product.id;

    Product.findOne({id: productId})
      .populate('categories')
      .exec(function (error, product) {
        var projectId = product.project;

        sails.log('-------- Product Controller product--------', product);
        PermissionsService.getPermissionsByProject(userId, projectId, function (error, permission) {
          var isAdmin,
            hasAccessToProduct,
            categories;

          if (error) {
            return response.serverError(error);
          }

          isAdmin = permission.admin;
          hasAccessToProduct = permission.productsPermission !== 'none';
          if (!isAdmin && !hasAccessToProduct) {
            return response.send(403, {
              code: 'access.denied',
              message: 'Access denied'
            });
          }

          categories = product.categories || [];
          return response.send(200, {
            code: 'successful',
            categories: categories
          });
        });
      });
  },

  /**
   * @param request
   * @param response
   */
  getVariants: function (request, response) {
    var user = request.user,
      userId = user.id,
      productId = request.param('id');

    Product.findOne({id: productId})
      .exec(function (error, product) {
        var projectId;

        if (typeof product === 'undefined') {
          return response.send(404, {
            code: 'not.found',
            message: 'product not found'
          });
        }

        projectId = product.project;
        sails.log('-------- Product Controller product--------', product);
        PermissionsService.getPermissionsByProject(userId, projectId, function (error, permission) {
          var isAdmin,
            hasAccessToProduct;

          if (error) {
            return response.serverError(error);
          }

          isAdmin = permission.admin;
          hasAccessToProduct = permission.productsPermission !== 'none';
          if (!isAdmin && !hasAccessToProduct) {
            return response.send(403, {
              code: 'access.denied',
              message: 'Access denied'
            });
          }

          Variant.find({product: productId})
            .populate('attributes')
            .populate('images')
            .populate('prices')
            .exec(function (error, variants) {
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
        });
      });
  },

  /**
   * @deprecated
   *
   * @param request
   * @param response
   */
  addCategory: function (request, response) {
    var user = request.user,
      userId = user.id,
      productId = request.param('id'),
      categoryId = request.param('categoryId');

    Product.findOne({id: productId})
      .populate('categories')
      .populate('variants')
      .exec(function (error, product) {
        var projectId;

        if (typeof product === 'undefined') {
          return response.send(400, {
            code: 'not.found',
            message: 'Product was not found'
          });
        }

        projectId = product.project;

        sails.log('-------- Product Controller product--------', product);
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
        });
      });
  },

  /**
   * @deprecated
   *
   * @param request
   * @param response
   */
  removeCategory: function (request, response) {
    var user = request.user,
      userId = user.id,
      productId = request.param('id'),
      categoryId = request.param('categoryId');

    Product.findOne({id: productId})
      .populate('categories')
      .populate('variants')
      .exec(function (error, product) {
        var projectId;

        if (typeof product === 'undefined') {
          return response.send(400, {
            code: 'not.found',
            message: 'Product was not found'
          });
        }

        projectId = product.project;

        sails.log('-------- Product Controller product--------', product);
        PermissionsService.getPermissionsByProject(userId, projectId, function (error, permission) {
          if (error) {
            return response.serverError(error);
          }

          if (!permission.admin) {
            return response.send(403, {
              code: 'access.denied',
              message: 'Access denied'
            });
          }

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
    var productId = request.param('id');

    Image.find({product: productId}).exec(function (error, images) {
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
    var productId = request.param('id');

    Price.find({product: productId}).exec(function (error, prices) {
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


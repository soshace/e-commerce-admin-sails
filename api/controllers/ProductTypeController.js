/**
 * ProductTypeController
 *
 * @description :: Server-side logic for managing producttypes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var _ = require('underscore');

module.exports = {

  create: function (request, response) {
    var user = request.user,
      userId = user.id,
      productTypeData = request.body,
      projectId = productTypeData.project;

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

      productTypeData.owner = user.id;
      ProductType.create(productTypeData).exec(function (error, productType) {
        if (error) {
          return response.send(500, {
            code: 'error',
            message: error
          });
        }

        response.send(200, {
          code: 'successful',
          productType: productType
        });
      });
    });
  },

  update: function (request, response) {
    var user = request.user,
      userId = user.id,
      productTypeData = request.body || {},
      productTypeId = request.param('id');


    ProductType.findOne({id: productTypeId}).exec(function (error, productType) {
      var projectId;

      if (error) {
        return response.serverError(error);
      }

      if (typeof  productType === 'undefined') {
        return response.send(404, {
          code: 'not.found',
          message: 'Product type not found'
        });
      }

      projectId = productType.project;
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

        _.extend(productType, productTypeData);

        productType.save(function (error, productType) {
          var returnedProductType;

          if (error) {
            return response.send(500, {
              code: 'error',
              message: error
            });
          }

          returnedProductType = _.pick(productType, 'id', 'name', 'description', 'createdAt', 'updatedAt');
          response.send(200, {
            code: 'successful',
            message: 'Product type was successfully updated',
            productType: returnedProductType
          });
        });
      });
    });
  },

  findOne: function (request, response) {
    var productTypeId = request.param('id');

    ProductType.findOne({id: productTypeId})
      .populate('productAttributes')
      .exec(function(error, productType){
      if(error){
        return response.serverError(error);
      }

      response.send(200, {
        code: 'successful',
        message: 'Product was successfully found',
        productType: productType
      });
    });
  },

  remove: function (request, response) {
    var productTypeId = request.param('id');

    ProductType.destroy({id: productTypeId})
      .exec(function (error, productType) {
        if (error) {
          return response.send(500, {
            code: 'error',
            message: error
          });
        }

        if (typeof productType === 'undefined') {
          return response.send(400, {
            code: 'not.found',
            message: 'Product type was not found'
          });
        }

        response.send(200, {
          code: 'successful',
          message: 'Product type was removed successfully',
          productType: productType
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

    ProductType.find({owner: userId}).exec(function (error, productTypes) {
      if (error) {
        return response.send(500, {
          code: 'error',
          message: error
        });
      }

      return response.send(200, {
        code: 'successful',
        productTypes: productTypes
      });
    });
  },

  getProductAttributes: function (request, response) {
    var productTypeId = request.productType.id;

    ProductAttribute.find({productType: productTypeId}).exec(function (error, productAttributes) {
      if (error) {
        return response.send(500, {
          code: 'error',
          message: error
        });
      }

      return response.send(200, {
        code: 'successful',
        productAttributes: productAttributes
      });
    });
  }
};


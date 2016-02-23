/**
 * ProductAttributeController
 *
 * @description :: Server-side logic for managing attributedefinitions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var _ = require('underscore');

module.exports = {
  create: function (request, response) {
    var user = request.user,
      userId = user.id,
      productAttributeData = request.body || {},
      productTypeId = productAttributeData.productType;


    if (_.isEmpty(productTypeId)) {
      return response.send(400, {
        code: 'error',
        message: 'You need to specify product type id'
      })
    }

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

        ProductAttribute.create(productAttributeData).exec(function (error, productAttribute) {
          if (error) {
            return response.send(500, {
              code: 'error',
              message: error
            });
          }

          response.send(200, {
            code: 'successful',
            productAttribute: productAttribute
          });
        });
      });
    });
  },

  update: function (request, response) {
    var user = request.user,
      userId = user.id,
      productAttributeData = request.body || {},
      productAttributeId = request.param('id');

    if (_.isEmpty(productAttributeId)) {
      return response.send(400, {
        code: 'error',
        message: 'You need to specify product type id'
      })
    }

    ProductAttribute.findOne({id: productAttributeId}).exec(function (error, productAttribute) {
      var projectId;

      if (error) {
        return response.serverError(error);
      }

      if (typeof  productAttribute === 'undefined') {
        return response.send(404, {
          code: 'not.found',
          message: 'Product attribute not found'
        });
      }

      projectId = productAttribute.project;
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

        _.extend(productAttribute, productAttributeData);

        productAttribute.save(function (error, productAttribute) {
          var returnedAttributeDefinition;

          if (error) {
            return response.send(500, {
              code: 'error',
              message: error
            });
          }

          returnedAttributeDefinition = _.pick(productAttribute, 'id', 'name', 'description', 'createdAt', 'updatedAt');
          response.send(200, {
            code: 'successful',
            message: 'Product was successfully updated',
            productAttribute: returnedAttributeDefinition
          });
        });
      });
    });
  },

  findOne: function (request, response) {
    response.send(200, {
      code: 'successful',
      message: 'Product Attribute was successfully found',
      productAttribute: request.productAttribute
    });
  },

  remove: function (request, response) {
    var productAttributeId = request.param('id');

    ProductAttribute.destroy({id: productAttributeId})
      .exec(function (error, productAttribute) {
        if (error) {
          return response.send(500, {
            code: 'error',
            message: error
          });
        }

        if (typeof productAttribute === 'undefined') {
          return response.send(400, {
            code: 'not.found',
            message: 'Product attribute was not found'
          });
        }

        response.send(200, {
          code: 'successful',
          message: 'Product attribute was removed successfully',
          productAttribute: productAttribute
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

    ProductAttribute.find({owner: userId}).exec(function (error, productAttributes) {
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


/**
 * ProductTypeController
 *
 * @description :: Server-side logic for managing producttypes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var _ = require('underscore');

module.exports = {

  //TODO: need to check that Project exists
  //TODO: need to check permissions to Project
  create: function (request, response) {
    var productTypeData = request.body,
      profile = request.user;

    productTypeData.owner = profile.id;
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
  },

  //TODO: need to check that Project exists
  //TODO: need to check permissions to Project
  update: function (request, response) {
    var productTypeData = request.body || {},
      productType = request.productType || {};

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
        message: 'Product was successfully updated',
        productType: returnedProductType
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


/**
 * ProductTypeController
 *
 * @description :: Server-side logic for managing producttypes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
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
    response.send(200, {
      code: 'successful',
      message: 'Product was successfully found',
      productType: request.productType
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
  }
};


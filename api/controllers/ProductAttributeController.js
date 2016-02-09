/**
 * ProductAttributeController
 *
 * @description :: Server-side logic for managing attributedefinitions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  //TODO: need to check if user have access to productType
  create: function (request, response) {
    var productAttributeData = request.body,
      profile = request.user;

    productAttributeData.owner = profile.id;
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
  },

  update: function (request, response) {
    var productAttributeData = request.body || {},
      productAttribute = request.productAttribute || {};

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


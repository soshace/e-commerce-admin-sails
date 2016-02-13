/**
 * VariantAttributeController
 *
 * @description :: Server-side logic for managing variantattributes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var _ = require('underscore');

module.exports = {
  //TODO: need to check that user have enough rights access to Attribute
  updateValue: function (request, response) {
    var attribute = request.variantAttribute,
      value = request.body && request.body.value;

    _.extend(attribute, {value: value});

    attribute.save(function (error, attribute) {
      if (error) {
        return response.send(500, {
          code: 'error',
          message: error
        });
      }

      attribute.productAttribute = attribute.productAttribute.id;
      attribute.owner = attribute.owner.id;
      attribute.variant = attribute.variant.id;
      response.send(200, {
        code: 'successful',
        message: 'Variant attribute was successfully updated',
        attribute: attribute
      });
    });
  }
};


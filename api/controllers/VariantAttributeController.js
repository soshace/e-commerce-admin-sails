/**
 * VariantAttributeController
 *
 * @description :: Server-side logic for managing variantattributes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  //TODO: need to check that user have enough rights access to Attribute
  updateValue: function (request, response) {
    var attributeId = request.param('id'),
      value = request.body && request.body.value;

    VariantAttribute.update({id: attributeId}, {value: value}).exec(function (error, attribute) {
      if (error) {
        return response.send(500, {
          code: 'error',
          message: error
        });
      }

      response.send(200, {
        code: 'successful',
        message: 'Variant attribute was successfully updated',
        attribute: attribute
      });
    });
  }
};


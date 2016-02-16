/**
 * Checking if user have enough rights access to the variantAttribute or not
 */

module.exports = function (request, response, next) {
  var variantAttributeId = request.param('id'),
    profile = request.user,
    profileId = profile.id;

  if (typeof variantAttributeId === 'undefined') {
    return response.send(400, {
      code: 'error',
      message: 'You should specify variantAttribute\'s id'
    });
  }

  VariantAttribute.findOne({id: variantAttributeId}).exec(function (error, variantAttribute) {
    if (error) {
      return response.send(500, {
        code: 'error',
        message: error
      });
    }

    if (typeof variantAttribute === 'undefined') {
      return response.send(400, {
        code: 'not.found',
        message: 'variantAttribute was not found'
      });
    }

    if (profileId !== variantAttribute.owner) {
      return response.send(403, {
        code: 'no.access',
        message: 'You don\'t have access to the resource'
      });
    }

    request.variantAttribute = variantAttribute;
    next();
  });
};

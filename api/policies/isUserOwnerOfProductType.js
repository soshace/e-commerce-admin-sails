/**
 * Checking if user have enough rights access to the project or not
 */
module.exports = function (request, response, next) {
  var productTypeId = request.param('id'),
    profile = request.user,
    profileId = profile.id;

  if (typeof productTypeId === 'undefined') {
    return response.send(400, {
      code: 'error',
      message: 'You should specify product type\'s id'
    });
  }

  ProductType.findOne({id: productTypeId}).exec(function (error, productType) {
    if (error) {
      return response.send(500, {
        code: 'error',
        message: error
      });
    }

    if (typeof productType === 'undefined') {
      return response.send(400, {
        code: 'not.found',
        message: 'ProductType was not found'
      });
    }

    if (profileId !== productType.owner) {
      return response.send(403, {
        code: 'no.access',
        message: 'You don\'t have access to the resource'
      });
    }

    request.productType = productType;
    next();
  });
};

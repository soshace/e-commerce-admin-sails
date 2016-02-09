/**
 * TODO: Need to check product permissions + if user is owner
 * TODO: Currently we are checking only if he is owner or not
 * Checking if user have enough rights access to the product or not
 */

module.exports = function (request, response, next) {
  var productId = request.param('id'),
    profile = request.user,
    profileId = profile.id;

  if (typeof productId === 'undefined') {
    return response.send(400, {
      code: 'error',
      message: 'You should specify product\'s id'
    });
  }

  Product.findOne({id: productId}).exec(function (error, product) {
    if (error) {
      return response.send(500, {
        code: 'error',
        message: error
      });
    }

    if (typeof product === 'undefined') {
      return response.send(400, {
        code: 'not.found',
        message: 'Product was not found'
      });
    }

    if (profileId !== product.owner) {
      return response.send(403, {
        code: 'no.access',
        message: 'You don\'t have access to the resource'
      });
    }

    request.product = product;
    next();
  });
};

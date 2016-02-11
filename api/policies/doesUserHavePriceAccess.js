/**
 * TODO: Need to check price permissions + if user is owner
 * TODO: Currently we are checking only if he is owner or not
 * Checking if user have enough rights access to the price or not
 */

module.exports = function (request, response, next) {
  var priceId = request.param('id'),
    profile = request.user,
    profileId = profile.id;

  if (typeof priceId === 'undefined') {
    return response.send(400, {
      code: 'error',
      message: 'You should specify price\'s id'
    });
  }

  Price.findOne({id: priceId}).exec(function (error, price) {
    if (error) {
      return response.send(500, {
        code: 'error',
        message: error
      });
    }

    if (typeof price === 'undefined') {
      return response.send(400, {
        code: 'not.found',
        message: 'Price was not found'
      });
    }

    if (profileId !== price.owner) {
      return response.send(403, {
        code: 'no.access',
        message: 'You don\'t have access to the resource'
      });
    }

    request.price = price;
    next();
  });
};

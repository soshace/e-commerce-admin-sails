/**
 * Checking if user have enough rights access to the category or not
 */

module.exports = function (request, response, next) {
  var categoryId = request.param('id'),
    profile = request.user,
    profileId = profile.id;

  if (typeof categoryId === 'undefined') {
    return response.send(400, {
      code: 'error',
      message: 'You should specify category\'s id'
    });
  }

  Category.findOne({id: categoryId}).exec(function (error, category) {
    if (error) {
      return response.send(500, {
        code: 'error',
        message: error
      });
    }

    if (typeof category === 'undefined') {
      return response.send(400, {
        code: 'not.found',
        message: 'category was not found'
      });
    }

    if (profileId !== category.owner) {
      return response.send(403, {
        code: 'no.access',
        message: 'You don\'t have access to the resource'
      });
    }

    request.category = category;
    next();
  });
};

/**
 * Allow any authenticated user.
 */
module.exports = function (request, response, next) {
  var params = request.param(),
    profile = request.user;

  if (params.id !== profile.id) {
    return response.send({
      code: 'have.no.access',
      message: 'you doesn\'t have to resource'
    });
  }

  next();
};

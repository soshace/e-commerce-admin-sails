/**
 * Allow any authenticated user.
 */
module.exports = function (request, response, next) {

  if (request.isAuthenticated()) {
    return next();
  }

  return response.send({
    code: 'not.authenticated',
    message: 'you are not authenticated'
  });
};

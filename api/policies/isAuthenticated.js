/**
 * Allow any authenticated user.
 */
module.exports = function (request, response, next) {

  if (request.isAuthenticated()) {
    return next();
  }

  return response.send(401, {
    code: 'not.authenticated',
    message: 'you are not authenticated'
  });
};

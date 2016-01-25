/**
 * Allow any authenticated user.
 */
module.exports = function (request, response, ok) {

  // User is allowed, proceed to controller
  var isAuth = request.isAuthenticated();

  if (isAuth) return next();
  // User is not allowed
  else return response.redirect("/login");
};

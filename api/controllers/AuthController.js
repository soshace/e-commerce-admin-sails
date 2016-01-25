/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var passport = require('passport');

module.exports = {
  login: function (request, response) {
    passport.authenticate('local', function (error, user) {
      if ((error) || (!user)) {
        return response.send({
          message: 'login failed'
        });
      }

      request.logIn(user, function (error) {
        if (error) {
          response.send(error);
        }
        return response.send({
          message: 'login successful'
        });
      });
    })(request, response);
  },
  logout: function (request, response) {
    request.logout();
    response.send('logout successful');
  }
};


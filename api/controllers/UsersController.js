/**
 * UserController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var passport = require('passport');

module.exports = {
  login: function (request, response) {
    passport.authenticate('local', function (error, user, info) {
      console.log('passport.authenticate', error, user);
      if ((error) || (!user)) {
        return response.send({
          code: 'login.failed',
          message: info.message
        });
      }

      request.logIn(user, function (error) {
        if (error) {
          return response.send({
            code: 'error',
            message: error
          });
        }

        response.send({
          code: 'login.successful',
          message: info.message,
          user: user
        });
      });
    })(request, response);
  },
  logout: function (request, response) {
    request.logout();
    response.send({
      code: 'logout.successful',
      message: 'logout successful'
    });
  },
  getProfile: function (request, response) {
    response.send({
      code: 'profile',
      profile: request.user
    });
  }
};


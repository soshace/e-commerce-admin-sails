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

        //have to get user again from database, because user object from request doesn't have full information about current user
        User.findOne({id: user.id}).exec(function (error, user) {
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

/**
 * Sails controllers expose some logic automatically via blueprints.
 *
 * Blueprints are enabled for all controllers by default, and they can be turned on or off
 * app-wide in `config/controllers.js`. The settings below are overrides provided specifically
 * for UserController.
 *
 * NOTE:
 * REST and CRUD shortcut blueprints are only enabled if a matching model file
 * (`models/Auth.js`) exists.
 *
 * NOTE:
 * You may also override the logic and leave the routes intact by creating your own
 * custom middleware for AuthController's `find`, `create`, `update`, and/or
 * `destroy` actions.
 */

module.exports.blueprints = {

  // Expose a route for every method,
  // e.g.
  // `/auth/foo` =&gt; `foo: function (req, res) {}`
  actions: true,

  // Expose a RESTful API, e.g.
  // `post /auth` =&gt; `create: function (req, res) {}`
  rest: true,

  // Expose simple CRUD shortcuts, e.g.
  // `/auth/create` =&gt; `create: function (req, res) {}`
  // (useful for prototyping)
  shortcuts: true

};


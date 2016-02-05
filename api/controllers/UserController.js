/**
 * UserController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var passport = require('passport'),
  _ = require('underscore');

module.exports = {
  login: function (request, response) {
    passport.authenticate('local', function (error, user, info) {
      sails.log('passport.authenticate', error, user);
      if ((error) || (!user)) {
        return response.send(401, {
          code: 'error',
          message: info.message
        });
      }

      request.logIn(user, function (error) {
        if (error) {
          return response.send(500, {
            code: 'error',
            message: error
          });
        }

        User.findOne({id: user.id})
          .populate('ownCompanies')
          .populate('ownTeams')
          .exec(function (error, userPopulated) {
            if (error) {
              return response.send(500, {
                code: 'error',
                message: error
              });
            }

            response.send(200, {
              code: 'successful',
              message: info.message,
              user: userPopulated
            });
          });
      });
    })(request, response);
  },
  logout: function (request, response) {
    request.logout();
    response.send(200, {
      code: 'successful',
      message: 'Logout is successful'
    });
  },
  create: function (request, response) {
    var usersData = request.body;

    User.create(usersData).exec(_.bind(function (error) {
      if (error) {
        return response.send(500, {
          code: 'error',
          message: error
        });
      }

      this.login(request, response);
    }, this));
  },
  getProfile: function (request, response) {
    response.send(200, {
      code: 'successful',
      profile: request.user
    });
  },

  //TODO: need to check data for update! Like email, companies, etc...
  update: function (request, response) {
    var userData = request.body || {},
      user = request.user || {};

    _.extend(user, userData);

    user.save(function (error, user) {
      var returnedUser;

      if (error) {
        return response.send(500, {
          code: 'error',
          message: error
        });
      }

      returnedUser = _.pick(user, 'email', 'name', 'createdAt', 'updateAt', 'id');

      sails.log('-----user.update-----user--------', user);
      response.send(200, {
        code: 'successful',
        message: 'User was updated successfully',
        user: returnedUser
      });
    });
  }
};


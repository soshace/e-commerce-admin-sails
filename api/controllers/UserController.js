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
          .populate('teams')
          .exec(function (error, userPopulated) {
            if (error) {
              return response.serverError(error);
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

  //TODO: need to check invitations!
  create: function (request, response) {
    var usersData = request.body;

    User.create(usersData).exec(_.bind(function (error) {
      if (error) {
        return response.serverError(error);
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
      userId = request.param('id');

    if (userId !== request.user.id) {
      return response.send(403, {
        code: 'access.denied',
        message: 'You are not able to change this user\'s data'
      });
    }

    User.update({id: userId}, userData).exec(function (error, user) {
      var returnedUser;

      if (error) {
        return response.serverError(error);
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


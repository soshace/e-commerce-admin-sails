/**
 * InviteController
 *
 * @description :: Server-side logic for managing invites
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  //TODO: need to close ability to invite owners to the team
  create: function (request, response) {
    var requestData = request.body;

    async.waterfall([
      function (callback) {
        Invitation.create(requestData).exec(callback);
      },
      function (invitation, callback) {
        User.findOne({email: invitation.email}).exec(function (error, user) {
          callback(error, invitation, user);
        });
      },
      function (invitation, user, callback) {
        sails.log('-------InvitationController 2------');
        if (user) {
          return Invitation.destroy({id: invitation.id}).exec(function (error) {
            callback(error, user, invitation);
          });
        }

        EmailService.sendInviteEmail(invitation, callback);
      },
      function () {
        var user,
          invitation,
          callback;

        sails.log('-------InvitationController 3-  arguments-----', arguments);
        if (arguments[0].id) {
          user = arguments[0];
          invitation = arguments[1];
          callback = arguments[2];

          return Team.findOne({id: invitation.team}).exec(function (error, team) {
            callback(error, user, team);
          });
        }

        callback = arguments[1];
        response.send(200, {
          code: 'invitation.sent',
          message: 'Invitation was sent'
        });
        callback(null);
      },
      function () {
        var user,
          team,
          callback;

        if (arguments[0].id) {
          user = arguments[0];
          team = arguments[1];
          callback = arguments[2];
          team.members.add(user.id);
          return team.save(callback);
        }

        callback = arguments[0];
        callback(null);
      },
      function () {
        var team,
          callback;

        sails.log('-------InvitationController 5------');
        if (arguments[0].id) {
          team = arguments[0];
          callback = arguments[1];

          response.send(200, {
            code: 'user.added.to.team',
            message: 'user was added to team',
            team: team
          });
          return callback(null);
        }

        callback = arguments[0];
        callback(null);
      }
    ], function (error) {
      sails.log('-------InvitationController create error------', error);
      if (error) {
        return response.serverError(error);
      }
    });
  }
};


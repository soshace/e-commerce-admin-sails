/**
 * InviteController
 *
 * @description :: Server-side logic for managing invites
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var async = require('async');

module.exports = {
  //TODO: need to close ability to invite owners to the team
  //TODO: need to remove user from another teams of current company
  create: function (request, response) {
    var that = this,
      requestData = request.body;

    async.waterfall([
      function createInvitation(callback) {
        Invitation.create(requestData).exec(callback);
      },
      function findUserByInvitation(invitation, callback) {
        User.findOne({email: invitation.email}).exec(function (error, user) {
          callback(error, invitation, user);
        });
      },
      function sendInvitationEmail(invitation, user, callback) {
        sails.log('-------InvitationController 2------');
        if (user) {
          return that.addExistedUserToTheTeam(response, invitation, user, callback);
        }

        EmailService.sendInviteEmail(invitation, function (error) {
          if (error) {
            return callback(error);
          }

          callback(null);
          return response.send(200, {
            code: 'invitation.sent',
            message: 'Invitation was sent'
          });
        });
      }
    ], function (error) {
      sails.log('-------InvitationController create error------', error);
      if (error) {
        return response.serverError(error);
      }
    });
  },

  addExistedUserToTheTeam: function (response, invitation, user, callback) {
    async.waterfall([
      function (callback) {
        Invitation.destroy({id: invitation.id}).exec(callback);
      },
      function (invitations, callback) {
        sails.log('-------InvitationController 3-  arguments-----', invitations);
        Team.findOne({id: invitation.team})
          .populate('permissions')
          .exec(callback);
      },
      function (team, callback) {
        if (typeof team === 'undefined') {
          response.send(404, {
            code: 'not.found',
            message: 'Team wasn\'t found'
          });
          return callback(null);
        }

        //TODO: need to check if user is already existed
        team.members.add(user.id);
        team.save(callback);
      },
      function (team, callback) {
        async.each(team.permissions, function (permission, callback) {
          sails.log('------addExistedUserToTheTeam---permission----', permission);

          //TODO: need to check if user is already existed
          permission.members.add(user.id);
          permission.save(callback);
        }, function (error) {
          callback(error, team);
        });
      },
      function (team, callback) {
        sails.log('----------addExistedUserToTheTeam---callback--------', callback);
        response.send(200, {
          code: 'user.added.to.team',
          message: 'user was added to team',
          team: team
        });
        return callback(null);
      }
    ], callback);
  }
};

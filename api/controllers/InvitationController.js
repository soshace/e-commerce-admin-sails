/**
 * InviteController
 *
 * @description :: Server-side logic for managing invites
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var async = require('async');

module.exports = {
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
        if (error.statusCode) {
          return response.send(error.statusCode, error);
        }
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
          .exec(function (err, team) {
            if (err) {
              response.serverError(err);
              return callback(err);
            }
            if (!team) {
              return callback({
                statusCode: 404,
                code: 'not.found',
                message: 'Team wasn\'t found'
              });
            }
            callback(err, team)
          });
      },
      function (team, callback) {
        Company
          .findOne({id: team.company})
          .populate('teams')
          .exec(function (err, company) {
            callback(err, company, team);
          })
      },
      function (company, teamToJoin, callback) {
        async.each(company.teams, function (team, callback) {
          Team
            .findOne({id: team.id})
            .populate('members')
            .exec(function (err, team) {
              //if this make admin team empty, return error
              var removingLastFromAdmin = (
                team.admin &&
                team.members.length == 1 &&
                team.id !== teamToJoin.id &&
                !!_.findWhere(team.members, {id: user.id})
              );
              if (removingLastFromAdmin) {
                callback({
                  statusCode: 403,
                  message: 'Admin team should contain at least one user'
                })
              } else {
                team.members.remove(user.id);
                team.save(callback);
              }
            })
        }, function (error) {
          callback(error, teamToJoin);
        });
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

/**
 * TeamController
 *
 * @description :: Server-side logic for managing teams
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var _ = require('underscore');

module.exports = {
  create: function (request, response) {
    var projectData = request.body || {},
      profile = request.user;

    projectData.owner = profile.id;
    Team.create(projectData).exec(function (error, team) {
      if (error) {
        return response.send(500, {
          code: 'error',
          message: error
        });
      }

      response.send(200, {
        code: 'successful',
        team: team
      });
    });
  },

  update: function (request, response) {
    var teamData = request.body || {},
      team = request.team;

    _.extend(team, teamData);

    team.save(function (error, team) {
      if (error) {
        return response.send(500, {
          code: 'error',
          message: error
        });
      }

      response.send(200, {
        code: 'successful',
        message: 'Team was successfully updated',
        team: team
      });
    });
  },

  find: function (request, response) {
    var user = request.user,
      userId = user.id;


    User.findOne({id: userId}).populate('ownTeams').exec(function (error, userWithOwnTeams) {
      var teams;

      if (error) {
        return response.send(500, {
          code: 'error',
          message: error
        });
      }

      teams = userWithOwnTeams.ownTeams || [];
      return response.send(200, {
        code: 'successful',
        teams: teams
      });
    });
  },


  findOne: function (request, response) {
    var teamId = request.param('id');

    Team.findOne({id: teamId})
      .populate('permissions')
      .populate('members')
      .exec(function (error, team) {
        if (error) {
          return response.send(500, {
            code: 'error',
            message: error
          });
        }

        if (typeof team === 'undefined') {
          return response.send(400, {
            code: 'not.found',
            message: 'Team not found'
          });
        }

        return response.send(200, {
          code: 'successful',
          team: team
        });
      });
  }
};


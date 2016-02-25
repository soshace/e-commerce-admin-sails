var async = require('async'),
  _ = require('underscore');

module.exports = {
  getTeamProjects: function (team, callback) {
    Team
      .findOne({id: team.id, admin: true})
      .populate('permissions')
      .exec(function (err, team) {
        var projects = [];
        async.each(team.permissions, function (permission, callback) {
          Project
            .findOne({id: permission.project})
            .exec(function (err, project) {
              projects.push(project);
              callback(null, projects);
            })
        }, function (error) {
          callback(error, projects);
        });
      })
  }

};

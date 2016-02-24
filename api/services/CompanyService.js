var _ = require('underscore');

module.exports = {
  adminsOnly: function (response, teams, userId, successCb) {
    var adminTeam;

    _.each(teams, function (team) {
      if (team.admin) {
        adminTeam = team;
      }
    });

    if (_.isEmpty(adminTeam)) {
      return response.send(404, {
        code: 'error',
        message: 'Admin team not found'
      });
    }

    Team.findOne({id: adminTeam.id})
      .populate('members')
      .exec(function (error, team) {
        var isAdmin = false;
        _.each(team.members, function (member) {
          if (member.id === userId) {
            isAdmin = true;
          }
        });

        if (!isAdmin) {
          return response.send(403, {
            code: 'access.denied',
            message: 'Access denied'
          });
        }

        successCb();
      });

  }

};

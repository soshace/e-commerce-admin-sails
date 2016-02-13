/**
 * Team.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
    name: {
      type: 'string',
      required: true
    },
    members: {
      collection: 'user',
      via: 'teams'
    },
    company: {
      model: 'company',
      required: true
    },
    permissions: {
      collection: 'permission',
      via: 'team'
    },
    owner: {
      model: 'user',
      required: true
    }
  },

  /**
   * Method creates permissions for each project of team's company
   *
   * @param team
   * @param callback
   */
  afterCreate: function (team, callback) {
    async.waterfall([
      function (callback) {
        sails.log('----team afterCreate team-----', team);
        Project.find({company: team.company}).exec(callback);
      },
      function (projects, callback) {
        sails.log('----team afterCreate projects-----', projects);
        async.each(projects, function (project, callback) {
          Permission.create({
            project: project.id,
            team: team.id
          }).exec(callback);
        }, callback);
      }
    ], callback);
  },

  /**
   * Method removes all permission, tied with team
   *
   * @param teams
   * @param callback
   */
  beforeDestroy: function (teams, callback) {
    async.each(teams, function (team, callback) {
      Permission.destroy({
        project: team.id
      }).exec(callback)
    }, callback);
  }
};

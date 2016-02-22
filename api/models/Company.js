/**
 * Company.js
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
    teams: {
      collection: 'team',
      via: 'company'
    },
    projects: {
      collection: 'project',
      via: 'company'
    },
    owner: {
      model: 'user',
      required: true
    }
  },

  /**
   * Create administrator's team
   *
   * @param company
   * @param callback
   */
  afterCreate: function (company, callback) {
    async.waterfall([
      function (callback) {
        sails.log('--------User  afterCreate company--------', company);
        Team.create({
          name: 'Administrators',
          company: company.id,
          owner: company.owner,
          admin: true
        }).exec(callback);
      },
      function (team, callback) {
        team.members.add(company.owner);
        team.save(callback);
      }
    ], callback);
  }
};

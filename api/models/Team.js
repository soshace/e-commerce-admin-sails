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
      via: 'teams',
      required: true
    },
    permissions: {
      collection: 'permission',
      via: 'team'
    },
    owner: {
      model: 'user',
      via: 'ownTeams',
      required: true
    }
  }
};


/**
 * Invite.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

var _ = require('underscore');

module.exports = {

  attributes: {
    email: {
      type: 'string',
      required: true,
      email: true
    },
    team: {
      model: 'team',
      required: true
    }
  }
};


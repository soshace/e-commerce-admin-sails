/**
 * Permission.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
    project: {
      model: 'project',
      via: 'permissions'
    },
    team: {
      model: 'team',
      via: 'permissions'
    },
    productsPermission: {
      type: 'string',
      enum: ['view', 'manage']
    },
    ordersPermission: {
      type: 'string',
      enum: ['view', 'manage']
    },
    customersPermission: {
      type: 'string',
      enum: ['view', 'manage']
    }
  }
};


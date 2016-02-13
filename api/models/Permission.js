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
      required: true
    },
    team: {
      model: 'team',
      required: true
    },
    productsPermission: {
      type: 'string',
      enum: ['none', 'view', 'manage'],
      defaultsTo: 'none'
    },
    ordersPermission: {
      type: 'string',
      enum: ['none', 'view', 'manage'],
      defaultsTo: 'none'
    },
    customersPermission: {
      type: 'string',
      enum: ['none', 'view', 'manage'],
      defaultsTo: 'none'
    },
    owner: {
      model: 'user',
      required: true
    }
  }
};


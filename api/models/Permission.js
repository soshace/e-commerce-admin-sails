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
      defaultsTo: 'none',
      required: true
    },
    ordersPermission: {
      type: 'string',
      enum: ['none', 'view', 'manage'],
      defaultsTo: 'none',
      required: true
    },
    customersPermission: {
      type: 'string',
      enum: ['none', 'view', 'manage'],
      defaultsTo: 'none',
      required: true
    },
    admin: {
      type: 'boolean',
      defaultsTo: false,
      required: true
    },
    owner: {
      model: 'user',
      required: true
    },
    //needed for getting rights access to resources. It helps make requests faster
    members: {
      collection: 'user',
      via: 'permissions'
    }
  }
};


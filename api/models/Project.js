/**
 * Project.js
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
    slug: {
      type: 'string',
      unique: true,
      required: true
    },
    //TODO: need to add validation for update method
    currency: {
      type: 'array',
      defaultsTo: ['USD'],
      required: true
    },
    //TODO: need to add validation for update method
    language: {
      type: 'array',
      defaultsTo: ['en'],
      required: true
    },
    company: {
      model: 'company',
      via: 'projects',
      required: true
    },
    owner: {
      model: 'user',
      via: 'ownProjects',
      required: true
    },
    products: {
      collection: 'product',
      via: 'project'
    },
    categories: {
      collection: 'category',
      via: 'project'
    },
    discounts: {
      collection: 'discount',
      via: 'project'
    },
    orders: {
      collection: 'order',
      via: 'project'
    },
    customers: {
      collection: 'customer',
      via: 'project'
    },
    productTypes: {
      collection: 'productType',
      via: 'project'
    },
    permissions: {
      collection: 'permission',
      via: 'project'
    }
  }
};


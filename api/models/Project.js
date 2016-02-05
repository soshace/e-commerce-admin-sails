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
    currency: {
      type: 'string',
      enum: ['USD', 'EUR', 'GBR', 'INR'],
      required: true
    },
    language: {
      type: 'string',
      enum: ['en', 'fr', 'de', 'ja', 'zh'],
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
      collection: 'orders',
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


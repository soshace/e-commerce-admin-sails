/**
 * ProductType.js
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
    description: {
      type: 'string',
      required: true
    },
    owner: {
      model: 'user',
      via: 'productTypes',
      required: true
    },
    project: {
      model: 'project',
      via: 'productTypes',
      required: true
    },
    image: {
      type: 'string'
    },
    products: {
      collection: 'product',
      via: 'productType'
    },
    productAttributes: {
      collection: 'productAttribute',
      via: 'productType'
    }
  }
};


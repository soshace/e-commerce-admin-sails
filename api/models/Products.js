/**
 * Product.js
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
      required: true,
      unique: true
    },
    keywords: {
      model: 'localizedStrings',
      required: true
    },
    productType: {
      model: 'productTypes',
      via: 'products'
    },
    categories: {
      collection: 'categories'
    },
    taxGroup: {
      model: 'taxGroups'
    }
  }
};


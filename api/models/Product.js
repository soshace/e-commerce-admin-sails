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
    //TODO: need to change this fields as said at documentation LocalizedString
    keywords: {
      type: 'string',
      required: true
    },
    productType: {
      model: 'productType',
      via: 'products'
    },
    categories: {
      collection: 'category'
    },
    taxGroup: {
      model: 'taxGroup'
    }
  }
};


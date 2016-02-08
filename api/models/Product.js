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
      type: 'string'
    },
    keywords: {
      model: 'localizedString'
    },
    owner: {
      model: 'user',
      required: true,
      via: 'ownProducts'
    },
    project: {
      model: 'project',
      via: 'products',
      required: true
    },
    //TODO: make it required!
    productType: {
      model: 'productType',
      via: 'products'
    },
    categories: {
      collection: 'category',
      via: 'products'
    },
    taxGroup: {
      model: 'taxGroup'
    }
  }
};


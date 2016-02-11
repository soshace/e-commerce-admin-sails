/**
 * Variant.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
    sku: {
      type: 'string'
    },
    attributes: {
      collection: 'variantAttribute',
      via: 'variant'
    },
    images: {
      collection: 'image',
      via: 'variant'
    },
    prices: {
      collection: 'price',
      via: 'variant'
    },
    isMaster: {
      type: 'boolean',
      defaultsTo: false,
      required: true
    },
    owner: {
      model: 'user',
      required: true
    },
    productType: {
      model: 'productType',
      required: true
    },
    product: {
      model: 'product',
      required: true
    }
  }
};


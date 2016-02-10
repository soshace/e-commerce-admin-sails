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
      collection: 'image'
    },
    prices: {
      collection: 'price'
    },
    isMaster: {
      type: 'boolean',
      defaultsTo: false,
      required: true
    },
    owner: {
      model: 'user',
      required: true,
      via: 'variants'
    },
    productType: {
      model: 'productType',
      required: true,
      via: 'variants'
    },
    product: {
      model: 'product',
      required: true,
      via: 'variants'
    },
    variantImages: {
      collection: 'image',
      via: 'variant'
    }
  }
};


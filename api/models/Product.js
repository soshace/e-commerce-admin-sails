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
    fullDescription: {
      type: 'string'
    },
    keywords: {
      model: 'localizedString'
    },
    owner: {
      model: 'user',
      required: true
    },
    project: {
      model: 'project',
      required: true
    },
    productType: {
      model: 'productType',
      required: true
    },
    categories: {
      collection: 'category',
      via: 'products'
    },
    taxGroup: {
      model: 'taxGroup'
    },
    variants: {
      collection: 'variant',
      via: 'product'
    },
    images: {
      collection: 'image',
      via: 'product'
    },
    prices: {
      collection: 'price',
      via: 'product'
    }
  },

  /**
   * Method creates Master Variant for new product
   *
   * @param product
   * @param callback
   */
  afterCreate: function (product, callback) {
    async.waterfall([
        function (callback) {
          sails.log('--------Product  afterCreate product--------', product);
          Variant.create({
            productType: product.productType,
            owner: product.owner,
            product: product.id,
            isMaster: true,
            project: product.project
          }).exec(callback);
        }
      ],
      callback);
  }
};


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
      via: 'ownProducts'
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
    'images': {
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
            isMaster: true
          }).exec(callback);
        },
        function (variant, callback) {
          sails.log('--------Product  afterCreate variant--------', variant);
          ProductType.findOne({id: variant.productType})
            .populate('productAttributes')
            .exec(function (error, productType) {
              callback(error, variant, productType);
            });
        },
        function (variant, productType, callback) {
          sails.log('--------Product afterCreate productType--------', productType);
          var productAttributes = productType.productAttributes;

          async.each(productAttributes, function (attribute, callback) {
            VariantAttribute.create({
              productAttribute: attribute.id,
              variant: variant.id
            }).exec(callback)
          }, callback);
        }
      ],
      callback);
  }
};


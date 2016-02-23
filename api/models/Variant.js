/**
 * Variant.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

var async = require('async');

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
    productType: {
      model: 'productType'
    },
    product: {
      model: 'product',
      required: true
    },
    //Additional field which helps to optimise permission requests
    project: {
      model: 'project',
      required: true
    }
  },

  afterCreate: function (variant, callback) {
    ProductAttribute.find({productType: variant.productType}).exec(function (error, attributes) {
      if (error) {
        return callback(error);
      }

      async.each(attributes, function (attribute, callback) {
        VariantAttribute.create({
          owner: attribute.owner,
          productAttribute: attribute.id,
          variant: variant.id,
          project: variant.project
        }).exec(callback)
      }, callback);
    });
  },


  afterDestroy: function (variants, callback) {
    async.each(variants, function (variant, callback) {
      async.waterfall([
        function (callback) {
          VariantAttribute.destroy({
            productAttribute: variant.id,
            variant: variant.id
          }).exec(callback);
        },
        function (attributes, callback) {
          Image.destroy({
            variant: variant.id
          }).exec(callback);
        },
        function (images, callback) {
          Price.destroy({
            variant: variant.id
          }).exec(callback);
        }
      ], callback);


    }, callback);
  }
};


/**
 * ProductAttribute.js
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
    label: {
      type: 'string',
      required: true
    },
    owner: {
      model: 'user',
      required: true
    },
    constraints: {
      type: 'string',
      enum: ['none', 'unique', 'combo', 'same'],
      required: true,
      defaultsTo: 'none'
    },
    isRequired: {
      type: 'boolean',
      required: true,
      defaultsTo: false
    },
    isSearchable: {
      type: 'boolean',
      required: true,
      defaultsTo: true
    },
    productType: {
      model: 'productType',
      required: true
    },
    attributeType: {
      type: 'string',
      enum: ['boolean', 'text', 'localizedText', 'enum', 'localizedEnum', 'number', 'money', 'date', 'time', 'dateTime', 'set', 'reference'],
      required: true
    },
    variantAttributes: {
      collection: 'variantAttribute',
      via: 'productAttribute'
    }
  },

  afterCreate: function (attribute, callback) {
    async.waterfall([
        function (callback) {
          sails.log('---ProductAttributes afterCreate attribute---', attribute);
          Variant.find({productType: attribute.productType}).exec(callback);
        },
        function (variants, callback) {
          async.each(variants, function (variant, callback) {
            VariantAttribute.create({
              owner: attribute.owner,
              productAttribute: attribute.id,
              variant: variant.id
            }).exec(callback)
          }, callback);
        }
      ],
      callback);
  },

  afterDestroy: function (attributes, callback) {
    async.each(attributes, function (attribute, callback) {
      Variant.find({productType: attribute.productType}).exec(function (error, variants) {
        if (error) {
          return callback(error);
        }

        async.each(variants, function (variant, callback) {
          VariantAttribute.destroy({
            productAttribute: attribute.id,
            variant: variant.id
          }).exec(callback)
        }, callback);
      });
    }, callback);
  }
};


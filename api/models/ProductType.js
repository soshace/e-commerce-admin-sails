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
      required: true
    },
    project: {
      model: 'project',
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
    },
    variants: {
      collection: 'variant',
      via: 'productType'
    },
    categories: {
      collection: 'category',
      via: 'productType'
    }
  },

  afterDestroy: function (productTypes, callback) {
    async.each(productTypes, function (productType, callback) {
      Category.destroy({
        productType: productType.id
      }).exec(callback);
    }, callback);
  }
};


/**
 * Price.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
    price: {
      type: 'float'
    },
    //TODO: need to redevelop to currency reference
    currency: {
      type: 'string',
      enum: ['EUR', 'USD', 'RUR']
    },
    //TODO: need to redevelop to group reference
    customerGroup: {
      type: 'string',
      enum: ['default', 'all']
    },
    channel: {
      type: 'string',
      enum: ['channel1', 'channel2']
    },
    product: {
      model: 'product',
      required: true
    },
    variant: {
      model: 'variant',
      required: true
    },
    owner: {
      model: 'user',
      required: true
    },
    //Additional field which helps to optimise permission requests
    project: {
      model: 'project'
    }
  },

  beforeCreate: function (price, callback) {
    Variant.find({id: price.variant}).exec(function (error, variant) {
      if (error) {
        return callback(error);
      }

      price.project = variant.project;
      callback(null, price);
    });
  }
};


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
    //TODO: need to check project's currencies
    currency: {
      type: 'string',
      currency: true
    },
    //TODO: need to check project's countries
    country: {
      type: 'string',
      country: true
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
      model: 'product'
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

  types: {
    currency: function (value) {
      return CurrencyService.isCurrencyAliasExists(value);
    },
    country: function (value) {
      return CountryService.isCountryAliasExists(value);
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


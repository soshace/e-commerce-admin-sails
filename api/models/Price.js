/**
 * Price.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
    price: {
      type: 'number'
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
      model: 'project',
      required: true
    }
  },

  types: {
    currency: function (value) {
      return CurrencyService.isCurrencyAliasExists(value);
    },
    country: function (value) {
      return CountryService.isCountryAliasExists(value);
    }
  }
};


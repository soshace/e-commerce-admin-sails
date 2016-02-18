var currencies = require('../../data/currencies.js'),
  _ = require('underscore');

module.exports = {
  getCurrenciesByLocale: function (locale) {
    var userLocale = locale || 'en';

    return currencies[userLocale];
  },

  isCurrencyAliasExists: function (alias) {
    var isExists = false,
      currencies = this.getCurrenciesByLocale();

    _.each(currencies, function (currency) {
      if (alias === currency.isoCode) {
        isExists = true;
      }
    });

    return isExists;
  },

  areCurrencyAliasesExist: function (aliases) {
    var currencies = this.getCurrenciesByLocale(),
      numberOfMatching = 0;

    _.each(currencies, function (currency) {
      if (aliases.indexOf(currency.isoCode) !== -1) {
        numberOfMatching++;
      }
    });

    return aliases.length === numberOfMatching;
  }
};

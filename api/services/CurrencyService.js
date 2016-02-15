var currencies = require('../../data/currencies.js'),
  _ = require('underscore');

module.exports = {
  getCurrenciesByLocale: function (locale) {
    var userLocale = locale || 'en';

    return currencies[userLocale];
  },

  isCurrencyAliasExists: function (alias) {
    return !!this.getCurrenciesByLocale()[alias];
  },

  areCurrencyAliasesExist: function (aliases) {
    var currencies = this.getCurrenciesByLocale(),
      areExist = true;

    _.each(aliases, function (alias) {
      if (!currencies[alias]) {
        areExist = false;
      }
    });

    return areExist;
  }
};

var countries = require('../../data/countries.js'),
  _ = require('underscore');

module.exports = {
  getCountryByLocale: function (locale) {
    var userLocale = locale || 'en';

    return countries[userLocale];
  },

  isCountryAliasExists: function (alias) {
    return !!this.getCountryByLocale()[alias];
  },

  areCountryAliasesExist: function (aliases) {
    var countries = this.getCountryByLocale(),
      areExist = true;

    _.each(aliases, function (alias) {
      if (!countries[alias]) {
        areExist = false;
      }
    });

    return areExist;
  }
};

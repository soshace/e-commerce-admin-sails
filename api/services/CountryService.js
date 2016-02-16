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
      numberOfMatching = 0;

    _.each(countries, function (country) {
      if (aliases.indexOf(country.isoCode) !== -1) {
        numberOfMatching++;
      }
    });

    return aliases.length === numberOfMatching;
  }
};

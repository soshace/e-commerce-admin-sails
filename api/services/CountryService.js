var countries = require('../../data/countries.js');

module.exports = {
  getCountryByLocale: function (locale) {
    var userLocale = locale || 'en';

    return countries[userLocale];
  }
};

var currencies = require('../../data/currencies.js');

module.exports = {
  getCurrenciesByLocale: function (locale) {
    var userLocale = locale || 'en';

    return currencies[userLocale];
  }
};

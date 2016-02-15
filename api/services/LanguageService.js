var languages = require('../../data/languages.js');

module.exports = {
  getLanguagesByLocale: function (locale) {
    var userLocale = locale || 'en';

    return languages[userLocale];
  }
};

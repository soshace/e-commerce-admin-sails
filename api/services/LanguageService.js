var languages = require('../../data/languages.js'),
  _ = require('underscore');

module.exports = {
  getLanguagesByLocale: function (locale) {
    var userLocale = locale || 'en';

    return languages[userLocale];
  },

  isLanguageAliasExists: function (alias) {
    var isExists = false,
      languages = this.getLanguagesByLocale();

    _.each(languages, function (language) {
      if (alias === language.isoCode) {
        isExists = true;
      }
    });

    return isExists;
  },

  areLanguageAliasesExist: function (aliases) {
    var languages = this.getLanguagesByLocale(),
      numberOfMatching = 0;

    _.each(languages, function (language) {
      if (aliases.indexOf(language.isoCode) !== -1) {
        numberOfMatching++;
      }
    });

    return aliases.length === numberOfMatching;
  }
};

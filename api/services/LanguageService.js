var languages = require('../../data/languages.js'),
  _ = require('underscore');

module.exports = {
  getLanguagesByLocale: function (locale) {
    var userLocale = locale || 'en';

    return languages[userLocale];
  },

  isLanguageAliasExists: function (alias) {
    return !!this.getLanguagesByLocale()[alias];
  },

  areLanguageAliasesExist: function (aliases) {
    var languages = this.getLanguagesByLocale(),
      areExist = true;

    _.each(aliases, function (alias) {
      if (!languages[alias]) {
        areExist = false;
      }
    });

    return areExist;
  }
};

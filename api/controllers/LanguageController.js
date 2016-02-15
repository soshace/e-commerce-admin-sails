/**
 * LanguagesController
 *
 * @description :: Server-side logic for managing languages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var languages = require('../../data/languages.js'),
  _ = require('underscore');

module.exports = {
  find: function (request, response) {
    var locale = request.param('locale'),
      translatedLanguages;

    translatedLanguages = languages[locale] || null;
    response.send(200, {
      code: 'success',
      countries: translatedLanguages
    });
  }
};


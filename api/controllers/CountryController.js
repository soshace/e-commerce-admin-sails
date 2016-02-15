/**
 * CountriesController
 *
 * @description :: Server-side logic for managing countries
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var countries = require('../../data/countries.js'),
  _ = require('underscore');

module.exports = {
  find: function (request, response) {
    var locale = request.param('locale'),
      translatedCountries,
      isFilledString = _.isString(locale) && locale.length;

    if (!isFilledString) {
      return response.send(400, {
          code: 'error',
          messages: 'You haven\'t specified locale'
        }
      );
    }

    translatedCountries = countries[locale] || null;
    response.send(200, {
      code: 'success',
      countries: translatedCountries
    });
  }
};


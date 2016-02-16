/**
 * CurrenciesController
 *
 * @description :: Server-side logic for managing currencies
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var currencies = require('../../data/currencies.js'),
  _ = require('underscore');

module.exports = {
  find: function (request, response) {
    var locale = request.param('locale'),
      translatedCurrencies;

    translatedCurrencies = currencies[locale] || null;
    response.send(200, {
      code: 'success',
      currencies: translatedCurrencies
    });
  }
};


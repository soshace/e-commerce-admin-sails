/**
 * Checking if user have specified locale in request
 */

var _ = require('underscore');

module.exports = function (request, response, next) {
  var locale = request.param('locale'),
    isFilledString = _.isString(locale) && locale.length;

  if (!isFilledString) {
    return response.send(400, {
        code: 'error',
        messages: 'You haven\'t specified locale'
      }
    );
  }

  next();
};

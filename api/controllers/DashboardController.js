/**
 * DashboardController
 *
 * @description :: Server-side logic for managing dashboards
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  getProfile: function (request, response) {
    response.send({
      code: 'profile',
      profile: request.user
    });
  }
};


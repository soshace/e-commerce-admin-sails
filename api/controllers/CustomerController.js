/**
 * UsersController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  create: function (request, response) {
    APIService(RegistrationService.registerUser, request, response);
  },
  verify: function (request, response) {
    APIService(RegistrationService.verifyUser, request, response);
  },
  current: function (request, response) {
    APIService(RegistrationService.currentUser, request, response);
  }
};

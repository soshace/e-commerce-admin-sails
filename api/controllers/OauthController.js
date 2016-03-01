/**
 * OauthController
 *
 * @description :: Server-side logic for managing oauths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  token: OauthService.oauth.grant()
};



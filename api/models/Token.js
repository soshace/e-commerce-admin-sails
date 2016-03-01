var Promise = require('bluebird'),
  randToken = require('rand-token');

var _ = require('underscore');

module.exports = {


  attributes: {

    accessToken: {
      type: 'string',
      required: true,
      unique: true
    },

    refreshToken: {
      type: 'string',
      required: true,
      unique: true
    },

    code: {
      type: 'string',
      unique: true
    },

    userId: {
      type: 'string'
    },

    expirationDate: {
      type: 'date'
    },

    clientId: {
      type: 'string',
      required: true
    },

    securityLevel: {
      type: 'string'
    },

    scope: {
      type: 'string'
    },

    calcExpiresIn: function () {
      return Math.floor(new Date(this.expirationDate).getTime() / 1000 - new Date().getTime() / 1000);
    },

    toJSON: function () {
      var hiddenProperties = ['id', 'accessToken', 'refreshToken', 'code', 'userId', 'clientId'],
        obj = this.toObject();

      obj.expiresIn = this.calcExpiresIn();

      hiddenProperties.forEach(function (property) {
        delete obj[property];
      });

      return obj;
    }
  },


  authenticate: function (criteria) {
    var tokenInfo,
      result;

    console.log('---Token authentificate criteria---------', criteria);
    if (criteria.accessToken) {
      result = Token.findOne({accessToken: criteria.accessToken});
    }
    else if (criteria.code) {
      console.log('---Token authentificate code---------', criteria.code);
      result = Token.findOne({code: criteria.code});
    }
    else {
      //Bad Token Criteria
      return Promise.reject("Unauthorized");
    }

    return result.then(function (token) {

      if (_.isEmpty(token)) {
        return null;
      }

      console.log('---Token authentificate ---------', criteria.code);
      // Handle expired token
      if (token.expirationDate && new Date() > token.expirationDate) {
        return Token.destroy({accessToken: token}).then(function () {
          return null
        });
      }

      tokenInfo = token;
      return Customer.findOne({id: token.userId});

    }).then(function (identity) {

      // to keep this example simple, restricted scopes are not implemented,
      // and this is just for illustrative purposes


      if (!identity) {
        return null;
      }
      else if (criteria.type == 'verification') {
        if (identity.email !== criteria.email) return null;
      }
      // Otherwise if criteria.type != 'verfication'
      else if (!identity.verifiedAt) return null;

      return {
        identity: identity,
        authorization: {
          scope: tokenInfo.scope,
          token: tokenInfo
        }
      };
    });
  },

  generateTokenString: function () {
    return randToken.generate(sails.config.security.oauth.token.length);
  },

  generateToken: function (criteria) {
    var token = {},
      accessToken;

    if (!criteria.clientId) return Promise.resolve(null);

    token.clientId = criteria.clientId;
    token.userId = criteria.userId || undefined;


    token.accessToken = accessToken = Token.generateTokenString();

    token.refreshToken = Token.generateTokenString();
    token.code = Token.generateTokenString();

    if (!criteria.expirationDate) {
      token.expirationDate = new Date();
      token.expirationDate.setTime(token.expirationDate.getTime() + sails.config.security.oauth.token.expiration * 1000 + 999);
    }


    return Token.findOrCreate(criteria, token).then(function (retrievedToken) {


      if (retrievedToken.accessToken !== accessToken) {
        return Token.update(criteria, token).then(function (updatedTokens) {
          return updatedTokens[0];
        });
      }
      return retrievedToken;
    });
  }
};

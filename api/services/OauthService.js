var oauthserver = require('oauth2-server'),
  OAuth2Error = require('oauth2-server/lib/error'),
  model = {};

model.getAccessToken = function (bearerToken, callback) {
  console.log('in getAccessToken (bearerToken: ' + bearerToken + ')');

  Token.findOne({accessToken: bearerToken}).exec(callback);
};

model.getClient = function (clientId, clientSecret, callback) {
  console.log('in getClient (clientId: ' + clientId + ', clientSecret: ' + clientSecret + ')');
  if (clientSecret === null) {
    return Client.findOne({clientId: clientId}).exec(callback);
  }

  Client.findOne({clientId: clientId}).exec(function (error, client) {
    if (error) {
      return callback(error);
    }

    if (client && client.compareSecret(clientSecret)) {
      return callback(null, client);
    }

    callback({error: 'User was not found'});
  });
};

//TODO: need to figure out with details of this
// This will very much depend on your setup, I wouldn't advise doing anything exactly like this but
// it gives an example of how to use the method to resrict certain grant types
model.grantTypeAllowed = function (clientId, grantType, callback) {
  console.log('in grantTypeAllowed (clientId: ' + clientId + ', grantType: ' + grantType + ')');

  if (grantType === 'password') {
    return Client.findOne({clientId: clientId}).exec(function (error, client) {
      if (error) {
        return callback(error);
      }

      if (client) {
        return callback(null, true);
      }

      callback({error: 'User was not found'});
    });
  }

  callback(false, true);
};

model.saveAccessToken = function (token, clientId, expires, customerId, callback) {
  console.log('in saveAccessToken (token: ' + token + ', clientId: ' + clientId + ', customerId: ' + customerId + ', expires: ' + expires + ')');

  Token.create({
    accessToken: token,
    refreshToken: Token.generateTokenString(),
    clientId: clientId,
    userId: customerId,
    expires: expires
  }).exec(callback);
};

/*
 * Required to support password grant type
 */
model.getUser = function (email, password, callback) {
  console.log('in getUser (email: ' + email + ', password: ' + password + ')');

  Customer.findOne({email: email}).exec(function (error, customer) {
    if (error) {
      return callback(error);
    }

    sails.log('-----OauthService getUser email password----');

    if (customer && customer.comparePassword(password)) {
      console.log('customer', customer, customer.comparePassword(password));
      return callback(null, customer.id);
    }

    var err = new Error('Wrong email/password pair');
    err.code = 403;
    // Is there a better way to remove stack?
    delete err.stack;
    callback(err);

  });
};


/*
 * Required to support refreshToken grant type
 */
//model.saveRefreshToken = function (token, clientId, expires, userId, callback) {
//  console.log('in saveRefreshToken (token: ' + token + ', clientId: ' + clientId + ', userId: ' + userId + ', expires: ' + expires + ')');
//
//  Token.create({
//    refreshToken: token,
//    clientId: clientId,
//    userId: userId,
//    expires: expires
//  }).exec(callback);
//};
//
model.getRefreshToken = function (refreshToken, callback) {
  console.log('in getRefreshToken (refreshToken: ' + refreshToken + ')');

  Token.findOne({refreshToken: refreshToken}).exec(callback);
};


module.exports = {
  oauth: oauthserver({
    model: model,
    grants: ['password'],
    debug: true
  })
};

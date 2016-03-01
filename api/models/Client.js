/**
 * Client.js
 */

var bcrypt = require('bcrypt-nodejs');
module.exports = {

  attributes: {
    clientId: {
      type: 'string',
      required: true,
      unique: true
    },

    clientSecret: {
      type: 'string',
      required: true
    },

    trustLevel: {
      type: 'string'
    },

    compareSecret: function (clientSecret) {
      //TODO: need to revert this logic
      //return bcrypt.compareSync(clientSecret, this.clientSecret);
      return clientSecret === this.clientSecret;
    },

    //TODO: need to add separate request for client secret
    //TODO: need to uncomment this method
    //toJSON: function () {
    //  var obj = this.toObject();
    //  delete obj.clientSecret;
    //
    //  return obj;
    //}
  },

  afterCreate: function (client, next) {
    Token.generateToken({
      clientId: client.clientId
    }).then(function () {
      next();
    });
  },

  //TODO: need to revert this logic later
  //beforeCreate: function (client, next) {
  //  if (client.hasOwnProperty('clientSecret')) {
  //    client.clientSecret = bcrypt.hashSync(client.clientSecret, bcrypt.genSaltSync(10));
  //    return next(false, client);
  //  }
  //
  //  next(null, client);
  //},
  //
  //beforeUpdate: function (client, next) {
  //  if (client.hasOwnProperty('clientSecret')) {
  //    client.clientSecret = bcrypt.hashSync(client.clientSecret, bcrypt.genSaltSync(10));
  //    return next(false, client);
  //  }
  //
  //  next(null, client);
  //}
};

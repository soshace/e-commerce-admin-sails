/**
 * Customer.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */
var bcrypt = require('bcrypt-nodejs');
module.exports = {

  attributes: {
    name: {
      type: 'string',
      required: true
    },

    email: {
      type: 'email',
      unique: true,
      required: true
    },

    password: {
      type: 'string',
      required: true,
      columnName: 'encrypted_password',
      minLength: 8
    },

    location: {
      type: 'string'
    },

    verifiedAt: {
      type : 'date'
    },

    comparePassword: function(password) {
      return bcrypt.compareSync(password, this.password);
    },

    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;

      return obj;
    }
  },

  beforeCreate: function(user, next) {
    if (user.hasOwnProperty('password')) {
      user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
      next(false, user);

    } else {
      next(null, user);
    }
  },


  beforeUpdate: function(user, next) {
    if (user.hasOwnProperty('password')) {
      user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
      next(false, user);
    } else {
      next(null, user);
    }
  }
};

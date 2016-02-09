/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */
var bcrypt = require('bcrypt'),
  async = require('async');

module.exports = {

  attributes: {
    name: {
      type: 'string',
      required: true
    },
    email: {
      type: 'email',
      required: true,
      unique: true
    },
    password: {
      type: 'string',
      minLength: 6,
      required: true
    },
    teams: {
      model: 'team',
      via: 'members'
    },
    language: {
      type: 'string',
      enum: ['en', 'de', 'it', 'ru', 'zh']
    },
    ownTeams: {
      collection: 'team',
      via: 'owner'
    },
    ownProjects: {
      collection: 'project',
      via: 'owner'
    },
    ownCompanies: {
      collection: 'company',
      via: 'owner'
    },
    ownProducts: {
      collection: 'product',
      via: 'owner'
    },
    productTypes: {
      collection: 'productType',
      via: 'owner'
    },
    productAttributes: {
      collection: 'productAttribute',
      via: 'owner'
    },
    toJSON: function () {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    }
  },

  beforeCreate: function (user, beforeCallback) {
    bcrypt.genSalt(10, function (error, salt) {
      bcrypt.hash(user.password, salt, function (error, hash) {
        if (error) {
          console.log(error);
          return beforeCallback(error);
        }

        user.password = hash;
        beforeCallback(null, user);
      });
    });
  },

  /**
   * Method creates Company and team 'Admin' associated with registered user
   * @param user
   * @param afterCallback
   */
  afterCreate: function (user, afterCallback) {
    var userName = user.name,
      companyName = userName + '\'s Company';


    sails.log('--------User afterCreate user--------', user);
    async.waterfall([
        function (callback) {
          sails.log('--------User  afterCreate user--------', user);
          Company.create({
            name: companyName,
            owner: user.id
          }).exec(callback);
        },
        function (company, callback) {
          sails.log('--------User  afterCreate company--------', company);
          Team.create({
            name: 'Admin',
            company: company.id,
            owner: user.id
          }).exec(callback);
        }
      ],
      afterCallback);
  }
};


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
      type: 'string',
      email: true,
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
    ownProductTypes: {
      collection: 'productType',
      via: 'owner'
    },
    ownProductAttributes: {
      collection: 'productAttribute',
      via: 'owner'
    },
    ownImages: {
      collection: 'image',
      via: 'owner'
    },
    ownPrices: {
      collection: 'image',
      via: 'owner'
    },
    toJSON: function () {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    }
  },

  beforeCreate: function (user, callback) {
    bcrypt.genSalt(10, function (error, salt) {
      bcrypt.hash(user.password, salt, function (error, hash) {
        if (error) {
          console.log(error);
          return callback(error);
        }

        user.password = hash;
        callback(null, user);
      });
    });
  },

  /**
   * Method creates Company and team 'Admin' associated with registered user
   * @param user
   * @param callback
   */
  afterCreate: function (user, callback) {
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
      callback);
  }
};


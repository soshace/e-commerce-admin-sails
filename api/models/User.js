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
      collection: 'team',
      via: 'members'
    },
    language: {
      type: 'string',
      enum: ['en', 'de', 'it', 'ru', 'zh'],
      required: true,
      defaultsTo: 'en'
    },
    //needed for getting rights access to resources. It helps make requests faster
    permissions: {
      collection: 'permission',
      via: 'members'
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
          sails.log('-----User  afterCreate user----', user);
          Invitation.destroy({email: user.email}).exec(function (error, invitations) {
            callback(error, user, invitations);
          });
        },
        function (user, invitations, callback) {
          sails.log('-----User  afterCreate invitations----', invitations);
          async.each(invitations, function (invitation, callback) {
            Team.findOne({id: invitation.team}).exec(function (error, team) {
              if (error) {
                return callback(error);
              }

              team.members.add(user.id);
              team.save(callback);
            });
          }, function (error) {
            callback(error, invitations);
          });
        },
        function (invitations, callback) {
          async.each(invitations, function (invitation, callback) {
            Permission.findOne({team: invitation.team}).exec(function (error, permission) {
              if (error) {
                return callback(error);
              }

              permission.members.add(user.id);
              permission.save(callback);
            });
          }, callback);
        }
      ],
      callback);
  }
};


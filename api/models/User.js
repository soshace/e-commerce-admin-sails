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
      collection: 'team',
      via: 'members'
    },
    companies: {
      collection: 'company',
      via: 'owner'
    },
    projects: {

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

  getSlug: function (name) {
    return name.replace(/\s+/g, '-');
  },

  /**
   * Method creates Company and team 'Admin' associated with registered user
   * @param user
   * @param afterCallback
   */
  afterCreate: function (user, afterCallback) {
    var that = this,
      userName = user.name,
      companyName = userName + '\'s Company';


    console.log('--------afterCreate--------', user);
    async.waterfall([
        function (callback) {
          console.log('--------afterCreate--------', user);
          Company.create({name: companyName}).exec(callback);
        },
        function (company, callback) {
          console.log('--------afterCreate--------', company);
          Team.create({name: 'Admin'}).exec(function (error, createdTeam) {
            callback(error, company, createdTeam)
          });
        },
        function (company, team, callback) {
          console.log('--------afterCreate--------', company, team);
          company.teams.add(team.id);
          company.save(function (error) {
            callback(error, team);
          });
        },
        function (team, callback) {
          console.log('--------afterCreate--------', team);
          team.members.add(user.id);
          team.save(callback);
        },
        //function (team, callback) {
        //  var projectName = 'New Project by User ' + user.id,
        //    slug = that.getSlug(projectName);
        //
        //  Project.create({
        //    name: 'projectName',
        //    slug: slug,
        //    currency: 'USD',
        //    language: 'en'
        //  }).exec(callback);
        //},
        //function(){
        //
        //}
      ],
      afterCallback);
  }
};


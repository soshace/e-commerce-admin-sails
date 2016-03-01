/**
 * Project.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

var async = require('async'),
  _ = require('underscore');

module.exports = {

  attributes: {
    name: {
      type: 'string',
      required: true
    },
    slug: {
      type: 'string',
      unique: true,
      required: true
    },
    currencies: {
      type: 'array',
      defaultsTo: ['USD'],
      required: true,
      currencies: true
    },
    languages: {
      type: 'array',
      defaultsTo: ['en'],
      required: true,
      languages: true
    },
    countries: {
      type: 'array',
      defaultsTo: ['US', 'DE'],
      countries: true
    },
    company: {
      model: 'company',
      required: true
    },
    products: {
      collection: 'product',
      via: 'project'
    },
    categories: {
      collection: 'category',
      via: 'project'
    },
    discounts: {
      collection: 'discount',
      via: 'project'
    },
    orders: {
      collection: 'order',
      via: 'project'
    },
    productTypes: {
      collection: 'productType',
      via: 'project'
    },
    permissions: {
      collection: 'permission',
      via: 'project'
    },
    client: {
      model: 'client'
    }
  },

  types: {
    currencies: function (value) {
      return CurrencyService.areCurrencyAliasesExist(value);
    },
    countries: function (value) {
      return CountryService.areCountryAliasesExist(value);
    },
    languages: function (value) {
      return LanguageService.areLanguageAliasesExist(value);
    }
  },

  /**
   * Method creates default Product Type for new project
   * Method creates permission objects, which needed for
   *
   * @param project
   * @param callback
   */
  afterCreate: function (project, callback) {
    var projectId = project.id;

    sails.log('--------Project afterCreate project--------', project);
    async.waterfall([
        function (callback) {
          sails.log('--------Project afterCreate--------');
          ProductType.create({
            name: 'Sample Product Type',
            description: 'A demo product type',
            project: projectId
          }).exec(callback);
        },
        function (productType, callback) {
          Team.find({company: project.company}).populate('members').exec(callback);
        },
        function (teams, callback) {
          async.each(teams, function (team, callback) {
            sails.log('-------Project create team-----', team);
            Permission
              .create({
                project: project.id,
                team: team.id,
                admin: team.admin
              })
              .exec(function (error, permission) {
                if (error) {
                  return callback(error);
                }

                async.each(team.members, function (member, callback) {
                  permission.members.add(member);
                  permission.save(callback);
                }, callback);
              });
          }, callback)
        }
      ],
      callback);
  },


  beforeCreate: function (project, callback) {
    Client.create({
      clientId: Token.generateTokenString(),
      clientSecret: Token.generateTokenString()
    }).exec(function (error, client) {
      if (error) {
        return callback(error);
      }

      project.client = client.id;
      callback(null, project);
    });
  },

  /**
   * Method removes all permissions tied with project
   * @param projects
   * @param callback
   */
  afterDestroy: function (projects, callback) {
    async.each(projects, function (project, callback) {
      async.waterfall([
        function (callback) {
          Permission.destroy({
            project: project.id
          }).exec(callback);
        },
        function (permissions, callback) {
          Product.destroy({
            project: project.id
          }).exec(callback);
        },
        function (products, callback) {
          Discount.destroy({
            project: project.id
          }).exec(callback);
        },
        function (discounts, callback) {
          Order.destroy({
            project: project.id
          }).exec(callback);
        },
        function (orders, callback) {
          Customer.destroy({
            project: project.id
          }).exec(callback);
        }
      ], callback);

    }, callback);
  }
};

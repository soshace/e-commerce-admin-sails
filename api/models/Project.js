/**
 * Project.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

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
    //TODO: need to add validation for update method
    currency: {
      type: 'array',
      defaultsTo: ['USD'],
      required: true
    },
    //TODO: need to add validation for update method
    language: {
      type: 'array',
      defaultsTo: ['en'],
      required: true
    },
    company: {
      model: 'company',
      required: true
    },
    owner: {
      model: 'user',
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
    customers: {
      collection: 'customer',
      via: 'project'
    },
    productTypes: {
      collection: 'productType',
      via: 'project'
    },
    currencies: {
      type: 'array',
      currencies: true
    },
    languages: {
      type: 'array',
      languages: true
    },
    countries: {
      type: 'array',
      countries: true
    },
    permissions: {
      collection: 'permission',
      via: 'project'
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
      return LanfuageService.areLanguageAliasesExist(value);
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
    var projectOwner = project.owner,
      projectId = project.id;

    sails.log('--------Project afterCreate project--------', project);
    async.waterfall([
        function (callback) {
          sails.log('--------Project afterCreate--------');
          ProductType.create({
            owner: projectOwner,
            name: 'Sample Product Type',
            description: 'A demo product type',
            project: projectId
          }).exec(callback);
        },
        function (productType, callback) {
          Team.find({company: project.company}).exec(callback);
        },
        function (teams, callback) {
          async.each(teams, function (team, callback) {
            Permission.create({
              project: project.id,
              team: team.id,
              owner: project.owner
            }).exec(callback);
          }, callback)
        }
      ],
      callback);
  },

  /**
   * Method removes all permissions tied with project
   * @param projects
   * @param callback
   */
  afterDestroy: function (projects, callback) {
    async.each(projects, function (project, callback) {
      Permission.destroy({
        project: project.id
      }).exec(callback)
    }, callback);
  }
};


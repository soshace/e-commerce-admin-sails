/**
 * CompanyController
 *
 * @description :: Server-side logic for managing companies
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var _ = require('underscore');

module.exports = {
  create: function (request, response) {
    var user = request.user,
      companyData = request.body || {};

    companyData.owner = user.id;
    Company.create(companyData).exec(function (error, company) {
      if (error) {
        return response.send(500, {
          code: 'error',
          message: error
        });
      }

      return response.send(200, {
        code: 'successful',
        message: 'Company was successfully created',
        company: company
      });
    });
  },

  update: function (request, response) {
    var companyData = request.body || {},
      company = request.company || {};

    _.extend(company, companyData);

    company.save(function (error, company) {
      var returnedCompany;

      if (error) {
        return response.send(500, {
          code: 'error',
          message: error
        });
      }

      returnedCompany = _.pick(company, 'name', 'createAt', 'updatedAt', 'id');
      response.send(200, {
        code: 'successful',
        message: 'Company was successfully updated',
        company: returnedCompany
      });
    });
  },

  findOne: function (request, response) {
    var companyId = request.param('id');

    Company.findOne({id: companyId})
      .populate('projects')
      .populate('teams')
      .exec(function (error, company) {
        if (error) {
          return response.send(500, {
            code: 'error',
            message: error
          });
        }

        if (typeof company === 'undefined') {
          return response.send(400, {
            code: 'not.found',
            message: 'Company was not found'
          });
        }

        return response.send(200, {
          code: 'successful',
          message: 'Company was successfully found',
          company: company
        });
      });
  },

  //TODO: need to check all tied teams and projects!
  remove: function (request, response) {
    var companyId = request.param('id');

    Company.destroy({id: companyId})
      .exec(function (error, company) {
        if (error) {
          return response.send(500, {
            code: 'error',
            message: error
          });
        }

        if (typeof company === 'undefined') {
          return response.send(400, {
            code: 'not.found',
            message: 'Company was not found'
          });
        }

        return response.send(200, {
          code: 'successful',
          message: 'Company was removed successfully',
          company: company
        });
      });
  },

  find: function (request, response) {
    var user = request.user;

    Company.find({owner: user.id}).exec(function (error, companies) {
      if (error) {
        return response.send(500, {
          code: 'error',
          message: error
        });
      }

      return response.send(200, {
        code: 'successful',
        message: 'Companies were successfully found',
        companies: companies
      });
    });
  },

  findTeams: function (request, response) {
    var companyId = request.param('id');

    Company.findOne({id: companyId}).populate('teams').exec(function (error, company) {
      var teams;

      if (error) {
        return response.send(500, {
          code: 'error',
          message: error
        });
      }


      teams = company.teams || [];
      return response.send(200, {
        code: 'successful',
        message: 'Company\'s teams were successfully found',
        teams: teams
      });
    });
  },

  findProjects: function (request, response) {
    var companyId = request.param('id');

    Company.findOne({id: companyId}).populate('projects').exec(function (error, company) {
      var projects;

      if (error) {
        return response.send(500, {
          code: 'error',
          message: error
        });
      }

      sails.log('----------CompanyController--company---', company);
      sails.log('----------CompanyController--company.projects---', company.projects);
      projects = company.projects || [];
      return response.send(200, {
        code: 'successful',
        message: 'Company\'s projects were successfully found',
        projects: projects
      });
    });
  }
};


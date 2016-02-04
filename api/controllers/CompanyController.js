/**
 * CompanyController
 *
 * @description :: Server-side logic for managing companies
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  create: function (request, response) {
    var user = request.user,
      companyData = request.body;

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
    var params = request.param(),
      companyId = params.id,
      companyData = request.body;

    Company.update({id: companyId}, companyData).exec(function (error, company) {
      if (error) {
        return response.send(500, {
          code: 'error',
          message: error
        });
      }

      return response.send(200, {
        code: 'successful',
        message: 'Company was successfully updated',
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
    var companyId = params.id;

    Company.find({id: companyId}).populate('teams').exec(function (error, company) {
      if (error) {
        return response.send(500, {
          code: 'error',
          message: error
        });
      }

      return response.send(200, {
        code: 'successful',
        message: 'Company\'s teams were successfully found',
        projects: company.teams
      });
    });
  },

  findProjects: function (request, response) {
    var companyId = params.id;

    Company.find({id: companyId}).populate('projects').exec(function (error, company) {
      if (error) {
        return response.send(500, {
          code: 'error',
          message: error
        });
      }

      return response.send(200, {
        code: 'successful',
        message: 'Company\'s projects were successfully found',
        projects: company.projects
      });
    });
  }
};


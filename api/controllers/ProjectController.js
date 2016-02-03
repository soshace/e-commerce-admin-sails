/**
 * ProjectController
 *
 * @description :: Server-side logic for managing projects
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  checkSlug: function (request, response) {
    var queryParams = request.query,
      slug = queryParams && queryParams.slug;

    if (typeof slug === 'undefined') {
      return response.send({
        code: 'error.slug.empty',
        message: 'Slug name can\'t be empty'
      });
    }

    Project.findOne({slug: slug}).exec(function (error, project) {
      if (error) {
        return response.send({
          code: 'error',
          message: error
        });
      }

      if (project) {
        return response.send({
          code: 'error.slug.exists',
          message: 'Slug name is already exists'
        });
      }
      response.send({
        code: 'slug.available',
        message: 'Slug name is available'
      });
    });
  },

  create: function (request, response) {
    var projectData = request.body;

    Project.create(projectData).exec(function(error, project){
      if(error){
        return response.send({
          code: 'error',
          message: error
        });
      }

      response.send({
        code: 'successfully.created',
        project: project
      });
    });
  },

  getProjectsByCompanyId: function (companyId, callback) {
    Project.find({company: companyId}).exec(function(error, companies){

    });
  },

  getProjectsWithAccess: function (userId) {

  },

  find: function (request, response) {
    var user = request.user;

    async.waterfall([
        function (callback) {
          user.populate('companies').exec(callback);
        },
        function (user, callback) {
          var companies = user.companies;

          user.populate('companies').exec(callback);
        },
        function (callback) {
          Project.find({company: companyId}).exec(callback);
        },
        function (projects, callback) {
          Project.find({company: companyId}).exec(callback);
        },
        function (company, callback) {
          Team.create({
            name: 'Admin',
            company: company.id
          }).exec(callback);
        }
      ],
      afterCallback);

    User.findOne({id: userId}).populate('companies').exec(function(error){

    })
  }
};

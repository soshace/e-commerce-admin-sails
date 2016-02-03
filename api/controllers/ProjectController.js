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
  }
};

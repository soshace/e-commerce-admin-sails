/**
 * Checking if user is owner of the company or not
 */
module.exports = function (request, response, next) {
  var params = request.param(),
    companyId = params.id,
    profile = request.user,
    profileId = profile.id;

  if (typeof companyId === 'undefined') {
    return response.send(400, {
      code: 'error.identificator.not.found',
      message: 'You should specify company\'s id'
    });
  }

  Company.findOne({id: companyId}).exec(function (error, company) {
    if (error) {
      return response.send(500, {
        code: 'error',
        message: error
      });
    }

    if (profileId !== company.owner) {
      return response.send(403, {
        code: 'no.access',
        message: 'You don\'t have access to the resource'
      });
    }

    request.company = company;
    next();
  });
};

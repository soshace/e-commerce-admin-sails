var Promise = require('bluebird'),
  promisify = Promise.promisify,
  sendResult,
  sendError,
  Model,
  API;

sendResult = function (request, response) {
  return function (result) {
    // Assume the response has already been sent if a null(ish) result
    if (result == null) return;

    //Ensure JSON Formatted Response
    if (typeof(result) != 'object') {
      result = {result: result};
    }
    response.json(result);
  }
};

sendError = function (request, response) {
  sails.log('--------SendError----------');
  return function (error) {
    var str,
      errTypes = ['unauthorized', 'forbidden', 'invalid', 'internal'],
      lineSeparator = "\n-------------------------------------------------------------------------\n",
      type = typeof(error);

    if (type !== 'object') {

      //Wrap the error in an object
      error = {message: error};
    }

    else if (error instanceof Error) {
      error = {
        name: error.name || undefined,
        message: error.message || undefined,
        raw: error
      };
    }

    if (type === 'string' || typeof error.message === 'string') {
      //Check if the error is more specific
      str = error.message.toLowerCase();
      if (errTypes.indexOf(str) > -1) {
        error[str] = true;
      }
      else if (error.code === "E_VALIDATION") {
        error.invalid = true;
      }
      else {
        error.internal = true;
      }
    }

    //Decide error response

    if (error.unauthorized) {
      response.send(401, error);
    }
    else if (error.forbidden) {
      response.forbidden(error);
    }
    else if (error.invalid) {
      response.send(422, error);
    }
    else if (error.internal) {
      response.serverError(error);
    }
    else {
      error.request = true;
      response.badRequest(error);
    }

    // Output error to server log
    console.log(lineSeparator);
    console.error(error);
    if (error.raw) console.error(error.raw);
    console.log("\nError Date: ", new Date());
    console.log(lineSeparator);
    //throw err.raw;
  }
};

Model = function (model) {
  this.model = model;
};

Model.prototype = {

  create: function (attributes) {
    return promisify(this.model.create)(attributes);
  },

  findOne: function (criteria) {
    return promisify(this.model.findOne)(criteria);
  },

  findOrCreate: function (criteria, attributes) {
    return promisify(this.model.findOrCreate)(criteria, attributes);
  },

  update: function (criteria, attributes) {
    return promisify(this.model.update)(criteria, attributes);
  },

  destroy: function (criteria) {
    return promisify(this.model.destroy)(criteria);
  }
};

API = function (action, request, response) {
  var data, context;

  //Validate Arguments
  if (!response || !request || !action) {
    throw {
      internal: true,
      message: "API Call Problem",
      parameters: {
        action: (action && "OK") || "BAD",
        request: (request && "OK") || "BAD",
        response: (response && "OK") || "BAD"
      }
    };

  }

  context = request.context || {};

  //Setup User Identity and Authorization data for ease of access
  context.identity = request.identity;
  context.authorization = request.authorization;

  data = request.params.all();

  return Promise.method(action)(data, context, request, response)
    .then(sendResult(request, response))
    .catch(sendError(request, response));
};

API.Model = function (model) {
  return new Model(model);
};

module.exports = API;

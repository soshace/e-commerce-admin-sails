/**
* Image.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    label: {
      type: 'string'
    },
    owner: {
      model: 'user',
      via: 'ownImages',
      required: true
    },
    uri: {
      type: 'string',
      required: true
    },
    external: {
      type: 'boolean',
      required: true,
      defaultsTo: false
    },
    width: {
      type: 'integer'
    },
    height: {
      type: 'integer'
    },
    product: {
      model: 'product'
    },
    variant: {
      model: 'variant',
      required: true
    },
    //Additional field which helps to optimise permission requests
    project: {
      model: 'project'
    }
  },

  beforeCreate: function (image, callback) {
    Variant.find({id: image.variant}).exec(function (error, variant) {
      if (error) {
        return callback(error);
      }

      image.project = variant.project;
      callback(null, image);
    });
  }
};


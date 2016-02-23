/**
 * VariantAttribute.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
    value: {
      type: 'string'
    },
    productAttribute: {
      model: 'productAttribute',
      required: true
    },
    variant: {
      model: 'variant',
      required: true
    },
    //Additional field which helps to optimise permission requests
    project: {
      model: 'project',
      required: true
    }
  }
};


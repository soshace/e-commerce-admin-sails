/**
* AttributeDefinition.js
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
    label: {
      type: 'string',
      required: true
    },
    constraints: {
      type: 'string',
      enum: ['none', 'unique', 'combo', 'same'],
    },
    isRequired: {
      type: 'boolean'
    },
    isSearchable: {
      type: 'boolean'
    }
  }
};


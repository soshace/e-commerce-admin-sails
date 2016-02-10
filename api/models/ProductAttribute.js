/**
* ProductAttribute.js
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
    owner: {
      model: 'user',
      via: 'ownProductAttributes',
      required: true
    },
    constraints: {
      type: 'string',
      enum: ['none', 'unique', 'combo', 'same'],
      required: true,
      defaultsTo: 'none'
    },
    isRequired: {
      type: 'boolean',
      required: true,
      defaultsTo: false
    },
    isSearchable: {
      type: 'boolean',
      required: true,
      defaultsTo: true
    },
    productType: {
      model: 'productType',
      via: 'attributeDefinitions',
      required: true
    },
    attributeType: {
      type: 'string',
      enum:['boolean', 'text', 'localizedText', 'enum', 'localizedEnum', 'number', 'money', 'date', 'time', 'dateTime', 'set', 'reference'],
      required: true
    }
  }
};


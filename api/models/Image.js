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
      model: 'product',
      via: 'productImages',
      required: true
    },
    variant: {
      model: variant,
      via: 'variantImages',
      required: true
    }
  }
};


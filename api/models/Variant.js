/**
 * Variant.js
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
    description: {
      type: 'string',
      required: true,
      unique: true
    },
    //TODO: need to change this fields as said at documentation AttributeDefinition
    attributes: {
      type: 'string',
      required: true
    },
    images: {
      collection: 'image'
    },
    prices: {
      collection: 'price'
    }
  }
};


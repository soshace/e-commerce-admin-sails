/**
 * Project.js
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
    slug: {
      type: 'string',
      required: true
    },
    currency: {
      type: 'string',
      enum: ['USD', 'EUR', 'GBR', 'INR'],
      required: true
    },
    language: {
      type: 'string',
      enum: ['en', 'fr', 'de', 'ja', 'zh'],
      required: true
    }
  }
};


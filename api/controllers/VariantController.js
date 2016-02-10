/**
 * VariantController
 *
 * @description :: Server-side logic for managing Variants
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  //TODO: need to check if user have access to variant by project access
  create: function (request, response) {
    var variantData = request.body,
      profile = request.user;

    variantData.owner = profile.id;
    Variant.create(variantData).exec(function (error, variant) {
      if (error) {
        return response.send(500, {
          code: 'error',
          message: error
        });
      }

      response.send(200, {
        code: 'successful',
        variant: variant
      });
    });
  },

  updateSKU: function (request, response) {
    var variantSKU = request.body && request.body.sku,
      variant = request.variant || {};

    _.extend(variant, {sku: variantSKU});

    variant.save(function (error, variant) {
      var returnedVariant;

      if (error) {
        return response.send(500, {
          code: 'error',
          message: error
        });
      }

      returnedVariant = _.pick(variant, 'id', 'createdAt', 'updatedAt', 'isMaster', 'productType', 'product', 'sku');
      response.send(200, {
        code: 'successful',
        message: 'Product was successfully updated',
        variant: returnedVariant
      });
    });
  },

  findOne: function (request, response) {
    var variantId = request.variant.id;

    Variant.findOne({id: variantId}).populate('attributes').exec(function (error, variant) {
      if (error) {
        return response.send(500, {
          code: 'error',
          message: error
        });
      }

      response.send(200, {
        code: 'successful',
        message: 'Variant was successfully found',
        variant: variant
      });
    });
  },

  remove: function (request, response) {
    var variantId = request.param('id');

    Variant.destroy({id: variantId})
      .exec(function (error, variant) {
        if (error) {
          return response.send(500, {
            code: 'error',
            message: error
          });
        }

        if (typeof variant === 'undefined') {
          return response.send(400, {
            code: 'not.found',
            message: 'Variant was not found'
          });
        }

        response.send(200, {
          code: 'successful',
          message: 'Variant was removed successfully',
          variant: variant
        });
      });
  },

  //TODO: need to include products which user has rights access
  find: function (request, response) {
    var user = request.user,
      userId = user.id;

    Variant.find({owner: userId}).exec(function (error, variants) {
      if (error) {
        return response.send(500, {
          code: 'error',
          message: error
        });
      }

      return response.send(200, {
        code: 'successful',
        variants: variants
      });
    });
  }
};


/**
 * VariantAttributeController
 *
 * @description :: Server-side logic for managing variantattributes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var _ = require('underscore');

module.exports = {
  //TODO: need to check that user have enough rights access to Attribute
  updateValue: function (request, response) {
    var attributeId = request.param('id'),
      value = request.body && request.body.value,
      user = request.user,
      userId = user.id;

    VariantAttribute.findOne({id: attributeId}).exec(function (error, attribute) {
      var projectId;

      if (error) {
        return response.serverError(error);
      }

      projectId = attribute.project;
      PermissionsService.getPermissionsByProject(userId, projectId, function (error, permission) {
        var isOwner,
          managerOfProducts;

        if (error) {
          return response.serverError(error);
        }

        isOwner = permission.isOwner;
        managerOfProducts = permission.productsPermission === 'manage';
        if (!isOwner && !managerOfProducts) {
          return response.send(403, {
            code: 'access.denied',
            message: 'Access denied'
          });
        }

        _.extend(attribute, {value: value});

        attribute.save(function (error, attribute) {
          if (error) {
            return response.send(500, {
              code: 'error',
              message: error
            });
          }

          attribute.productAttribute = attribute.productAttribute.id;
          attribute.owner = attribute.owner.id;
          attribute.variant = attribute.variant.id;
          response.send(200, {
            code: 'successful',
            message: 'Variant attribute was successfully updated',
            attribute: attribute
          });
        });
      });
    });
  }
};


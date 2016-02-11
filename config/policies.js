/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your controllers.
 * You can apply one or more policies to a given controller, or protect
 * its actions individually.
 *
 * Any policy file (e.g. `api/policies/authenticated.js`) can be accessed
 * below by its filename, minus the extension, (e.g. "authenticated")
 *
 * For more information on how policies work, see:
 * http://sailsjs.org/#!/documentation/concepts/Policies
 *
 * For more information on configuring policies, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.policies.html
 */


module.exports.policies = {

  /***************************************************************************
   *                                                                          *
   * Default policy for all controllers and actions (`true` allows public     *
   * access)                                                                  *
   *                                                                          *
   ***************************************************************************/

  '*': true,

  /***************************************************************************
   *                                                                          *
   * Here's an example of mapping some policies to run before a controller    *
   * and its actions                                                          *
   *                                                                          *
   ***************************************************************************/

  'UserController': {
    'update': ['isAuthenticated', 'isProfileOwner'],
    'getProfile': 'isAuthenticated',
    'logout': 'isAuthenticated'
  },

  'ProjectController': {
    'create': 'isAuthenticated',
    'find': 'isAuthenticated',
    'findOne': ['isAuthenticated', 'doesUserHaveProjectAccess'],
    'findProjectCategories': ['isAuthenticated', 'doesUserHaveProjectAccess'],
    'findProjectProducts': ['isAuthenticated', 'doesUserHaveProjectAccess'],
    'findProjectProductTypes': ['isAuthenticated', 'doesUserHaveProjectAccess'],
    'remove': ['isAuthenticated', 'doesUserHaveProjectAccess'],
    'update': ['isAuthenticated', 'doesUserHaveProjectAccess']
  },

  'ProductController': {
    'create': 'isAuthenticated',
    'find': 'isAuthenticated',
    'findOne': ['isAuthenticated', 'doesUserHaveProductAccess'],
    'remove': ['isAuthenticated', 'doesUserHaveProductAccess'],
    'update': ['isAuthenticated', 'doesUserHaveProductAccess'],
    'getCategories': ['isAuthenticated', 'doesUserHaveProductAccess'],
    'getImages': ['isAuthenticated', 'doesUserHaveProductAccess'],
    'getPrices': ['isAuthenticated', 'doesUserHaveProductAccess'],
    'getVariants': ['isAuthenticated', 'doesUserHaveProductAccess'],
    'addCategory': ['isAuthenticated', 'doesUserHaveProductAccess'],
    'removeCategory': ['isAuthenticated', 'doesUserHaveProductAccess']
  },

  'CategoryController': {
    'create': 'isAuthenticated',
    'find': 'isAuthenticated',
    'findOne': ['isAuthenticated', 'doesUserHaveCategoryAccess'],
    'remove': ['isAuthenticated', 'doesUserHaveCategoryAccess'],
    'update': ['isAuthenticated', 'doesUserHaveCategoryAccess'],
    'getProduct': ['isAuthenticated', 'doesUserHaveCategoryAccess'],
    'addProduct': ['isAuthenticated', 'doesUserHaveCategoryAccess'],
    'removeProduct': ['isAuthenticated', 'doesUserHaveCategoryAccess']
  },

  'CompanyController': {
    'create': 'isAuthenticated',
    'find': 'isAuthenticated',
    'update': ['isAuthenticated', 'isCompanyOwner'],
    'findOne': ['isAuthenticated', 'isCompanyOwner'],
    'remove': ['isAuthenticated', 'isCompanyOwner'],
    'findTeams': ['isAuthenticated', 'isCompanyOwner'],
    'findProjects': ['isAuthenticated', 'isCompanyOwner']
  },

  'TeamController': {
    'create': 'isAuthenticated',
    'find': 'isAuthenticated',
    'findOne': ['isAuthenticated', 'isTeamOwner'],
    'remove': ['isAuthenticated', 'isTeamOwner'],
    'update': ['isAuthenticated', 'isTeamOwner']
  },

  'ProductTypeController': {
    'create': 'isAuthenticated',
    'find': 'isAuthenticated',
    'findOne': ['isAuthenticated', 'doesUserHaveProductTypeAccess'],
    'remove': ['isAuthenticated', 'doesUserHaveProductTypeAccess'],
    'update': ['isAuthenticated', 'doesUserHaveProductTypeAccess'],
    'getProductAttributes': ['isAuthenticated', 'doesUserHaveProductTypeAccess']
  },

  'ProductAttributeController': {
    'create': 'isAuthenticated',
    'find': 'isAuthenticated',
    'findOne': ['isAuthenticated', 'doesUserHaveProductAttributeAccess'],
    'remove': ['isAuthenticated', 'doesUserHaveProductAttributeAccess'],
    'update': ['isAuthenticated', 'doesUserHaveProductAttributeAccess']
  },

  'VariantController': {
    'create': 'isAuthenticated',
    'find': 'isAuthenticated',
    'findOne': ['isAuthenticated', 'doesUserHaveVariantAccess'],
    'getImages': ['isAuthenticated', 'doesUserHaveVariantAccess'],
    'getPrices': ['isAuthenticated', 'doesUserHaveVariantAccess'],
    'remove': ['isAuthenticated', 'doesUserHaveVariantAccess'],
    'updateSKU': ['isAuthenticated', 'doesUserHaveVariantAccess']
  },

  'VariantAttributeController': {
    'updateValue': 'isAuthenticated'
  },

  'ImageController': {
    'create': 'isAuthenticated',
    'find': 'isAuthenticated',
    'findOne': ['isAuthenticated', 'doesUserHaveImageAccess'],
    'remove': ['isAuthenticated', 'doesUserHaveImageAccess'],
    'update': ['isAuthenticated', 'doesUserHaveImageAccess'],
    'upload': ['isAuthenticated']
  },

  'PriceController': {
    'create': 'isAuthenticated',
    'find': 'isAuthenticated',
    'findOne': ['isAuthenticated', 'doesUserHavePriceAccess'],
    'remove': ['isAuthenticated', 'doesUserHavePriceAccess'],
    'update': ['isAuthenticated', 'doesUserHavePriceAccess']
  }

  // RabbitController: {

  // Apply the `false` policy as the default for all of RabbitController's actions
  // (`false` prevents all access, which ensures that nothing bad happens to our rabbits)
  // '*': false,

  // For the action `nurture`, apply the 'isRabbitMother' policy
  // (this overrides `false` above)
  // nurture	: 'isRabbitMother',

  // Apply the `isNiceToAnimals` AND `hasRabbitFood` policies
  // before letting any users feed our rabbits
  // feed : ['isNiceToAnimals', 'hasRabbitFood']
  // }
};

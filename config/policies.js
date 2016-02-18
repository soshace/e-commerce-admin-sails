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
    'create': ['isAuthenticated', 'isCompanyOwner'],
    'find': 'isAuthenticated',
    'findOne': 'isAuthenticated',
    'findProjectCategories': 'isAuthenticated',
    'findProjectProducts': 'isAuthenticated',
    'findProjectProductTypes': ['isAuthenticated', 'isUserOwnerOfProject'],
    'findPermissions': ['isAuthenticated', 'isUserOwnerOfProject'],
    'remove': ['isAuthenticated', 'isUserOwnerOfProject'],
    'update': 'isAuthenticated'
  },

  'ProductController': {
    'create': 'isAuthenticated',
    'find': 'isAuthenticated',
    'findOne': ['isAuthenticated', 'isUserOwnerOfProduct'],
    'remove': ['isAuthenticated', 'isUserOwnerOfProduct'],
    'update': ['isAuthenticated', 'isUserOwnerOfProduct'],
    'getCategories': ['isAuthenticated', 'isUserOwnerOfProduct'],
    'getImages': ['isAuthenticated', 'isUserOwnerOfProduct'],
    'getPrices': ['isAuthenticated', 'isUserOwnerOfProduct'],
    'getVariants': ['isAuthenticated', 'isUserOwnerOfProduct'],
    'addCategory': ['isAuthenticated', 'isUserOwnerOfProduct'],
    'removeCategory': ['isAuthenticated', 'isUserOwnerOfProduct']
  },

  'CategoryController': {
    'create': 'isAuthenticated',
    'find': 'isAuthenticated',
    'findOne': ['isAuthenticated', 'isUserOwnerOfCategory'],
    'remove': ['isAuthenticated', 'isUserOwnerOfCategory'],
    'update': ['isAuthenticated', 'isUserOwnerOfCategory'],
    'getProduct': ['isAuthenticated', 'isUserOwnerOfCategory'],
    'addProduct': ['isAuthenticated', 'isUserOwnerOfCategory'],
    'removeProduct': ['isAuthenticated', 'isUserOwnerOfCategory']
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
    'findPermissions': ['isAuthenticated', 'isTeamOwner'],
    'remove': ['isAuthenticated', 'isTeamOwner'],
    'update': ['isAuthenticated', 'isTeamOwner'],
    'removeMember': ['isAuthenticated', 'isTeamOwner']
  },

  'ProductTypeController': {
    'create': 'isAuthenticated',
    'find': 'isAuthenticated',
    'findOne': ['isAuthenticated', 'isUserOwnerOfProductType'],
    'remove': ['isAuthenticated', 'isUserOwnerOfProductType'],
    'update': ['isAuthenticated', 'isUserOwnerOfProductType'],
    'getProductAttributes': ['isAuthenticated', 'isUserOwnerOfProductType']
  },

  'ProductAttributeController': {
    'create': 'isAuthenticated',
    'find': 'isAuthenticated',
    'findOne': ['isAuthenticated', 'isUserOwnerOfProductAttribute'],
    'remove': ['isAuthenticated', 'isUserOwnerOfProductAttribute'],
    'update': ['isAuthenticated', 'isUserOwnerOfProductAttribute']
  },

  'VariantController': {
    'create': 'isAuthenticated',
    'find': 'isAuthenticated',
    'findOne': ['isAuthenticated', 'isUserOwnerOfVariant'],
    'getImages': ['isAuthenticated', 'isUserOwnerOfVariant'],
    'getPrices': ['isAuthenticated', 'isUserOwnerOfVariant'],
    'remove': ['isAuthenticated', 'isUserOwnerOfVariant'],
    'updateSKU': ['isAuthenticated', 'isUserOwnerOfVariant']
  },

  'VariantAttributeController': {
    'updateValue': ['isAuthenticated', 'isUserOwnerOfVariantAttribute']
  },

  'ImageController': {
    'create': 'isAuthenticated',
    'find': 'isAuthenticated',
    'findOne': ['isAuthenticated', 'isUserOwnerOfImage'],
    'remove': ['isAuthenticated', 'isUserOwnerOfImage'],
    'update': ['isAuthenticated', 'isUserOwnerOfImage'],

    'upload': ['isAuthenticated']
  },

  'PriceController': {
    'create': 'isAuthenticated',
    'find': 'isAuthenticated',
    'findOne': ['isAuthenticated', 'isUserOwnerOfProduct'],
    'remove': ['isAuthenticated', 'isUserOwnerOfProduct'],
    'update': ['isAuthenticated', 'isUserOwnerOfProduct']
  },

  'PermissionController': {
    'find': 'isAuthenticated',
    'update': ['isAuthenticated', 'isUserOwnerOfPermission']
  },

  'CountryController': {
    'find': 'isAuthenticated'
  },

  'LanguageController': {
    'find': 'isAuthenticated'
  },

  'CurrencyController': {
    'find': 'isAuthenticated'
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

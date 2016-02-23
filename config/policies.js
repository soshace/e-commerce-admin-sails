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
    'update': 'isAuthenticated',
    'getProfile': 'isAuthenticated',
    'logout': 'isAuthenticated'
  },

  'ProjectController': {
    'create': 'isAuthenticated',
    'find': 'isAuthenticated',
    'findOne': 'isAuthenticated',
    'findProjectCategories': 'isAuthenticated',
    'findProjectProducts': 'isAuthenticated',
    'findProjectProductTypes': 'isAuthenticated',
    'findPermissions': ['isAuthenticated', 'isUserOwnerOfProject'],
    'remove': 'isAuthenticated',
    'update': 'isAuthenticated'
  },

  'ProductController': {
    'create': 'isAuthenticated',
    //DEPRECATED
    //'find': 'isAuthenticated',
    'findOne': 'isAuthenticated',
    'remove': 'isAuthenticated',
    'update': 'isAuthenticated',
    //DEPRECATED
    //'getCategories': 'isAuthenticated',
    //'getImages': ['isAuthenticated', 'isUserOwnerOfProduct'],
    //'getPrices': ['isAuthenticated', 'isUserOwnerOfProduct'],
    'getVariants': 'isAuthenticated',
    'addCategory': 'isAuthenticated',
    'removeCategory': ['isAuthenticated', 'isUserOwnerOfProduct']
  },

  'CategoryController': {
    'create': 'isAuthenticated',
    //DEPRECATED
    //'find': 'isAuthenticated',
    'findOne': 'isAuthenticated',
    'remove': 'isAuthenticated',
    'update': 'isAuthenticated',
    'getProducts': 'isAuthenticated',
    'addProduct': 'isAuthenticated',
    'removeProduct': 'isAuthenticated'
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
    //DEPRECATED
    //'find': 'isAuthenticated',
    'create': 'isAuthenticated',
    'findOne': 'isAuthenticated',
    'remove': 'isAuthenticated',
    'update': 'isAuthenticated',
    'getProductAttributes': 'isAuthenticated'
  },

  'ProductAttributeController': {
    //DEPRECATED
    //'find': 'isAuthenticated',
    'create': 'isAuthenticated',
    'findOne': ['isAuthenticated', 'isUserOwnerOfProductAttribute'],
    'remove': ['isAuthenticated', 'isUserOwnerOfProductAttribute'],
    'update': ['isAuthenticated', 'isUserOwnerOfProductAttribute']
  },

  'VariantController': {
    //DEPRECATED API
    //'find': 'isAuthenticated',
    //'findOne': ['isAuthenticated', 'isUserOwnerOfVariant'],
    //'getImages': ['isAuthenticated', 'isUserOwnerOfVariant'],
    //'getPrices': ['isAuthenticated', 'isUserOwnerOfVariant'],
    'create': 'isAuthenticated',
    'remove': 'isAuthenticated',
    'updateSKU': 'isAuthenticated'
  },

  'VariantAttributeController': {
    'updateValue': 'isAuthenticated'
  },

  'ImageController': {
    //DEPRECATED
    //'find': 'isAuthenticated',
    //'findOne': ['isAuthenticated', 'isUserOwnerOfImage'],
    'create': 'isAuthenticated',
    'remove': 'isAuthenticated',
    'update': 'isAuthenticated',
    'upload': ['isAuthenticated']
  },

  'PriceController': {
    //DEPRECATED
    //'find': 'isAuthenticated',
    //'findOne': ['isAuthenticated', 'isUserOwnerOfProduct'],
    'create': 'isAuthenticated',
    'remove': 'isAuthenticated',
    'update': 'isAuthenticated'
  },

  'PermissionController': {
    //DEPRECATED
    //'find': 'isAuthenticated',
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

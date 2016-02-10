/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  //'/': {
  //  view: 'homepage'
  //},

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

  'post /users': 'UserController.create',
  'put /users/:id': 'UserController.update',
  'post /users/login': 'UserController.login',
  'get /users/logout': 'UserController.logout',
  'get /users/profile': 'UserController.getProfile',
  'get /projects/slug/check/:slugName': 'ProjectController.checkSlug',
  'post /projects': 'ProjectController.create',
  'get /projects': 'ProjectController.find',
  'put /projects/:id': 'ProjectController.update',
  'get /projects/:id': 'ProjectController.findOne',
  'get /projects/:id/products': 'ProjectController.findProjectProducts',
  'get /projects/:id/categories': 'ProjectController.findProjectCategories',
  'get /projects/:id/product_types': 'ProjectController.findProjectProductTypes',
  'delete /projects/:id': 'ProjectController.remove',
  'post /companies': 'CompanyController.create',
  'get /companies': 'CompanyController.find',
  'put /companies/:id': 'CompanyController.update',
  'get /companies/:id': 'CompanyController.findOne',
  'delete /companies/:id': 'CompanyController.remove',
  'get /companies/:id/teams': 'CompanyController.findTeams',
  'get /companies/:id/projects': 'CompanyController.findProjects',
  'post /teams': 'TeamController.create',
  'get /teams': 'TeamController.find',
  'get /teams/:id': 'TeamController.findOne',
  'delete /teams/:id': 'TeamController.remove',
  'put /teams/:id': 'TeamController.update',
  'post /products': 'ProductController.create',
  'get /products': 'ProductController.find',
  'put /products/:id': 'ProductController.update',
  'get /products/:id': 'ProductController.findOne',
  'delete /products/:id': 'ProductController.remove',
  'get /products/:id/categories': 'ProductController.getCategories',
  'get /products/:id/variants': 'ProductController.getVariants',
  'post /products/:id/categories/:categoryId': 'ProductController.addCategory',
  'delete /products/:id/categories/:categoryId': 'ProductController.removeCategory',
  'post /categories': 'CategoryController.create',
  'get /categories': 'CategoryController.find',
  'put /categories/:id': 'CategoryController.update',
  'get /categories/:id': 'CategoryController.findOne',
  'delete /categories/:id': 'CategoryController.remove',
  'get /categories/:id/products': 'CategoryController.getProducts',
  'post /categories/:id/products/:productId': 'CategoryController.addProduct',
  'delete /categories/:id/products/:productId': 'CategoryController.removeProduct',
  'post /product_types': 'ProductTypeController.create',
  'get /product_types': 'ProductTypeController.find',
  'put /product_types/:id': 'ProductTypeController.update',
  'get /product_types/:id': 'ProductTypeController.findOne',
  'delete /product_types/:id': 'ProductTypeController.remove',
  'get /product_types/:id/product_attributes': 'ProductTypeController.getProductAttributes',
  'post /product_attributes': 'ProductAttributeController.create',
  'get /product_attributes': 'ProductAttributeController.find',
  'put /product_attributes/:id': 'ProductAttributeController.update',
  'get /product_attributes/:id': 'ProductAttributeController.findOne',
  'delete /product_attributes/:id': 'ProductAttributeController.remove',
  'post /variants': 'VariantController.create',
  'get /variants': 'VariantController.find',
  'put /variants/:id': 'VariantController.updateSKU',
  'get /variants/:id': 'VariantController.findOne',
  'delete /variants/:id': 'VariantController.remove',
  'put /variant_attributes/:id': 'VariantAttributeController.updateValue',
};

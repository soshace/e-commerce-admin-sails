/**
 * Connections
 * (sails.config.connections)
 *
 * `Connections` are like "saved settings" for your adapters.  What's the difference between
 * a connection and an adapter, you might ask?  An adapter (e.g. `sails-mysql`) is generic--
 * it needs some additional information to work (e.g. your database host, password, user, etc.)
 * A `connection` is that additional information.
 *
 * Each model must have a `connection` property (a string) which is references the name of one
 * of these connections.  If it doesn't, the default `connection` configured in `config/models.js`
 * will be applied.  Of course, a connection can (and usually is) shared by multiple models.
 * .
 * Note: If you're using version control, you should put your passwords/api keys
 * in `config/local.js`, environment variables, or use another strategy.
 * (this is to prevent you inadvertently sensitive credentials up to your repository.)
 *
 * For more information on configuration, check out:
 * http://links.sailsjs.org/docs/config/connections
 */

module.exports.connections = {

  //TODO: need to replace authentification data with  url: process.env.MONGOLAB_URI
  //https://github.com/balderdashy/sails-mongo

  //currently need to create database in mongo shell 'freeway' (use freeway) and user (db.createUser({"user":"user", "pwd":"password", roles:["dbAdmin", "readWrite"]}))
  mongo: {
    adapter: 'sails-mongo',
    host: 'localhost',
    port: '27017',
    user: 'user',
    password: 'password',
    database: 'freeway'
  }
};

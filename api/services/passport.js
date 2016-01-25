var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  bcrypt = require('bcrypt');

//helper functions
function findById(id, callback) {
  User.findOne(id).done(function (error, user) {
    if (error) {
      return callback(null, null);
    } else {
      return callback(null, user);
    }
  });
}

function findByUsername(username, callback) {
  User.findOne({
    name: username
  }).done(function (error, user) {
    // Error handling
    if (error) {
      return callback(null, null);
      // The User was found successfully!
    } else {
      return callback(null, user);
    }
  });
}

// Passport session setup.
// To support persistent login sessions, Passport needs to be able to
// serialize users into and deserialize users out of the session. Typically,
// this will be as simple as storing the user ID when serializing, and finding
// the user by ID when deserializing.
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  findById(id, function (error, user) {
    done(error, user);
  });
});

// Use the LocalStrategy within Passport.
// Strategies in passport require a `verify` function, which accept
// credentials (in this case, a username and password), and invoke a callback
// with a user object.
passport.use(new LocalStrategy(
  function (username, password, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      // Find the user by username. If there is no user with the given
      // username, or the password is not correct, set the user to `false` to
      // indicate failure and set a flash message. Otherwise, return the
      // authenticated `user`.
      findByUsername(username, function (error, user) {
        if (error) {
          return done(null, error);
        }

        if (!user) {
          return done(null, false, {
            message: 'Unknown user ' + username
          });
        }
        bcrypt.compare(password, user.password, function (error, response) {
          var returnUser;

          if (!response)
            return done(null, false, {
              message: 'Invalid Password'
            });

          returnUser = {
            username: user.username,
            createdAt: user.createdAt,
            id: user.id
          };

          return done(null, returnUser, {
            message: 'Logged In Successfully'
          });
        });
      })
    });
  }
));

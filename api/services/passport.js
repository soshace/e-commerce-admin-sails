var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  bcrypt = require('bcrypt');
console.log('service/passport');
//helper functions
function findById(id, callback) {
  User.findOne(id).exec(function (error, user) {
    console.log('User.findOne-----------!!!!!!!!!!!!');
    if (error) {
      return callback(null, null);
    } else {
      return callback(null, user);
    }
  });
}

function findByEmail(email, callback) {
  console.log('findByEmail-----------!!!!!!!!!!!!', email);
  User.findOne({
    email: email
  }).exec(function (error, user) {
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
  console.log('-----------serializeUser---------1', user);
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  console.log('deserializeUser-----------!!!!!!!!!!!!');
  findById(id, function (error, user) {
    done(error, user);
  });
});

// Use the LocalStrategy within Passport.
// Strategies in passport require a `verify` function, which accept
// credentials (in this case, a username and password), and invoke a callback
// with a user object.
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function (email, password, done) {
    console.log('-----------findByUsername---------0', email, password);
    // asynchronous verification, for effect...
    process.nextTick(function () {
      // Find the user by username. If there is no user with the given
      // username, or the password is not correct, set the user to `false` to
      // indicate failure and set a flash message. Otherwise, return the
      // authenticated `user`.
      findByEmail(email, function (error, user) {
        console.log('-----------findByUsername---------', error, user);
        if (error) {
          return done(null, error);
        }

        if (!user) {
          return done(null, false, {
            message: 'Unknown user ' + email
          });
        }
        bcrypt.compare(password, user.password, function (error, response) {
          var returnUser;
          console.log('-----------findByUsername---------2', error, response);
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

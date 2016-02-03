var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  bcrypt = require('bcrypt');

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findOne({id: id}, function (error, user) {
    done(error, user);
  });
});

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function (email, password, done) {

    User.findOne({email: email}, function (error, user) {
      if (error) {
        return done(error);
      }

      if (typeof user === 'undefined') {
        return done(null, false, {message: 'Incorrect email.'});
      }

      bcrypt.compare(password, user.password, function (error, response) {
        if (!response)
          return done(null, false, {
            message: 'Invalid Password'
          });

        return done(null, user, {
          message: 'Logged In Successfully'
        });
      });
    });
  }
));

var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  bcrypt = require('bcrypt');

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  Users.findOne({id: id}, function (err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function (email, password, done) {

    Users.findOne({email: email}, function (error, user) {
      if (error) {
        return done(error);
      }

      if (user === null) {
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

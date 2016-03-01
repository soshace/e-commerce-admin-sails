var Promise = require('bluebird'),
  mailer = require('nodemailer'),
  emailGeneratedCode,
  transporter;


transporter = mailer.createTransport({
  service: sails.config.email.mailService,
  auth: {
    user: sails.config.email.mailNoReply,
    pass: sails.config.email.mailPassword
  }
});

emailGeneratedCode = function (options) {
  var message,
    url = options.verifyURL,
    email = options.email;


  message = 'Hello!';
  message += '<br/>';
  message += 'Please visit the verification link to complete the registration process.';
  message += '<br/><br/>';
  message += 'Account with ' + options.type + " : " + options.id;
  message += '<br/><br/>';
  message += '<a href="';
  message += url;
  message += '">Verification Link</a>';
  message += '<br/>';

  transporter.sendMail({
    from: sails.config.email.mailNoReply,
    to: email,
    subject: 'Canadian Tire App Account Registration',
    html: message
  }, function (err, info) {
    console.log("Email Response:", info);
  });

  return {
    url: url
  }
};

module.exports = {
  emailGeneratedCode: emailGeneratedCode,
  currentUser: function (data, context) {
    return context.identity;
  },
  registerUser: function (data, context) {
    return APIService.Model(Customer).create({
      name: data.name,
      email: data.email,
      password: data.password,
      project: data.project
    }).then(function (user) {
      context.id = user.email;
      context.type = 'Email';
      return Token.generateToken({
        userId: user.id,
        clientId: Token.generateTokenString()
      });
    }).then(function (token) {
      return emailGeneratedCode({
        id: context.id,
        type: context.type,
        verifyURL: sails.config.security.server.url + "/customers/verify/" + data.email + "?code=" + token.code,
        email: data.email
      });
    });

  },

  verifyUser: function (data, context) {
    return Token.authenticate({
      code: data.code,
      type: 'verification',
      email: data.email
    }).then(function (info) {
      var date = new Date();

      if (!info) {
        sails.log('---RegistrationService verifyUser info---------', info);
        return Promise.reject('Unauthorized');
      }

      APIService.Model(Customer).update({
          email: info.identity.email
        },
        {
          verifiedAt: date
        });

      return {
        verified: true,
        email: info.identity.email
      }
    });
  }
};

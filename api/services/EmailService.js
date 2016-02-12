// EmailService.js - in api/services

var NodeMailer = require('nodemailer'),
  transport = NodeMailer.createTransport({
    service: sails.config.email.mailService,
    auth: {
      user: sails.config.email.mailNoReply,
      pass: sails.config.email.mailPassword
    }
  });

module.exports = {

  sendInviteEmail: function (options, callback) {
    options.layout = false;

    sails.renderView('invitationEmail', options, function (error, template) {

      if (error) {
        return callback(error);
      }

      transport.sendMail({
        from: sails.config.email.mailNoReply,
        to: options.email,
        subject: sails.config.email.inviteSubject,
        html: template
      }, callback);
    });

  }
};

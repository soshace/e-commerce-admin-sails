module.exports.email = {
  mailService: process.env.MAIL_SERVICE || 'yandex',
  mailNoReply: process.env.MAIL_NO_REPLY || 'testov.testin@yandex.ru',
  mailPassword: process.env.MAIL_PASSWORD || '123123123123',
  inviteSubject:  process.env.INVITE_SUBJECT || 'Invite Subject'
};

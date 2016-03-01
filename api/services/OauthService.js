var oauth = oauthserver({
  model: OauthController, // See below for specification
  grants: ['password'],
  debug: true
});

module.exports = {
  oauth: oauth,
  authorize: oauth.authorise()
};

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GithubStrategy = require('passport-github2').Strategy;
const LinkedinStrategy = require('passport-linkedin-oauth2').Strategy;

module.exports = (passport) => {
  // used to serialize the user for the session
  passport.serializeUser((user, cb) => {
    cb(null, user);
  });
  
  // used to deserialize the user
  passport.deserializeUser((user, cb) => {
   cb(null, user);
  });

  // Goggle 
  passport.use(new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL
    },
    function(token, refreshToken, profile, cb) {
      let user = {};
      process.nextTick(() => {
        user.name = profile._json.name;
        user.email = profile._json.email;
        user.picture = profile._json.picture;
        return cb(null, user);
      });
    }
  ));

  // Github 
  passport.use(new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
      scope: ['user:email']
    },
    function(token, refreshToken, profile, cb) {
      let user = {};
      process.nextTick(() => {
        user.name = profile._json.name;
        user.email = profile.emails[0].value;
        user.picture = profile._json.avatar_url
        return cb(null, user);
      });
    }
  ));

  // Linkedin 
  passport.use(new LinkedinStrategy(
    {
      clientID: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
      callbackURL: process.env.LINKEDIN_CALLBACK_URL,
      scope: ['r_emailaddress', 'r_liteprofile']
    },
    function(token, refreshToken, profile, cb) {
      let user = {};
      process.nextTick(() => {
        user.name = profile.displayName;
        user.email = profile.emails[0].value;
        user.picture = profile.photos[3].value;
        return cb(null, user);
      });
    }
  ));
};
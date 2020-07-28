const express = require('express');
const passport = require('passport');
const route = express.Router();

/*****  Google  ****/
// send to google to do the authentication
// profile gets us their basic information including their name
// email gets their emails
route.get('/google', 
    passport.authenticate(
      'google', 
      { scope: ['profile', 'email'] }
    )
);

route.get('/google/callback', 
  passport.authenticate(
    'google', 
    {
      successRedirect: '/profile',
      failureRedirect: '/'
    }
));


/*****  Github  ****/
// send to github to do the authentication
// profile gets us their basic information including their name
// email gets their emails
route.get('/github', 
  passport.authenticate('github')
);

route.get('/github/callback', 
  passport.authenticate(
    'github', 
    {
      successRedirect: '/profile',
      failureRedirect: '/'
    }
));


/*****  Linkedin  ****/
// send to linkedin to do the authentication
// profile gets us their basic information including their name
// email gets their emails
route.get('/linkedin', 
  passport.authenticate('linkedin')
);

route.get('/linkedin/callback', 
  passport.authenticate(
    'linkedin', 
    {
      successRedirect: '/profile',
      failureRedirect: '/'
    }
));

module.exports = route;
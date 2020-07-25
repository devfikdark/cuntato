const express = require('express');
const passport = require('passport');
const route = express.Router();

route.get('/google', passport.authenticate(
  'google', 
  { scope: ['profile', 'email'] }
));
route.get('/google/callback', 
    passport.authenticate(
      'google', 
      {
        successRedirect: '/profile',
        failureRedirect: '/'
      }
  ));
//route.get('/github', getData);
//route.get('/linkedin', getData);

module.exports = route;
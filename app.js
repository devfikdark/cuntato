const express = require('express');
const passport = require('passport');
const cors = require('cors')
const app = express();
const flash    = require('connect-flash');
const cookieParser = require('cookie-parser');
const session      = require('express-session');
const bodyParser = require('body-parser');
const appRouter = require('./router/appRouter');
const authRouter = require('./router/authRouter');

// handle headers
app.use(cors());

require('./controllers/authController')(passport);
app.use(cookieParser()); 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(session({ secret: 'morol' }));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash());
// allow https
app.enable('trust proxy'); 

// Router session
require('./router/basicRouter')(app);
app.use('/api', appRouter);
app.use('/auth', authRouter);

// error session
app.get('*', function(req, res){
  res.status(404).render('error');
});

module.exports = app;

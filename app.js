const express = require('express');
const passport = require('passport');
const cors = require('cors')
const app = express();
const flash    = require('connect-flash');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cookieParser = require('cookie-parser');
const session      = require('express-session');
const bodyParser = require('body-parser');
const appRouter = require('./router/appRouter');
const authRouter = require('./router/authRouter');

/******* Middlewares List ******/ 
// Limit requests from same API
let limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, Please try again in an hour !!!'
});
app.use('/api', limiter);

// Data sanitization against NoSQL query injections
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

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

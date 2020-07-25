const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const appRouter = require('./router/appRouter');
const authRouter = require('./router/authRouter');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use((req, res, next) => {
  // website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  // request methods yo wish to allow 
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // request HEADERS yo wish to allow 
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Accept');
  // request HEADERS yo wish to allow 
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use('/api', appRouter);
app.use('/auth', authRouter);

app.get('/', (req, res) => {
  res.header('Content-Type', 'text/html');
  res.render('welcome');
})

module.exports = app;
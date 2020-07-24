let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let appRouter = require('./router/appRouter');
// require('./utils/middleware');

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
/*
app.use((req, res, next) => {
  res.header('Content-Type', 'application/json');
  next();
})
*/
app.use('/api', appRouter);

app.get('/', (req, res) => {
  res.header('Content-Type', 'text/html');
  res.render('index');
})

module.exports = app;
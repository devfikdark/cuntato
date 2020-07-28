const express = require('express');
const cors = require('cors')
const app = express();
const bodyParser = require('body-parser');
const appRouter = require('./router/appRouter');
const authRouter = require('./router/authRouter');

// handle headers
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');
// allow https
app.enable('trust proxy'); 

app.use('/api', appRouter);
app.use('/auth', authRouter);

/*** Basic Render ***/
app.get('/', (req, res) => {
  res.header('Content-Type', 'text/html');
  res.render('index');
});

app.get('/profile', (req, res) => {
  res.header('Content-Type', 'text/html');
  res.render('profile');
});

app.get('/project', (req, res) => {
  res.header('Content-Type', 'text/html');
  res.render('project');
})

module.exports = app;

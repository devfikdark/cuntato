const express = require('express');
const cors = require('cors')
const app = express();
const bodyParser = require('body-parser');
const appRouter = require('./router/appRouter');
const authRouter = require('./router/authRouter');

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.enable('trust proxy'); // allow https

app.use('/api', appRouter);
app.use('/auth', authRouter);

app.get('/', (req, res) => {
  res.header('Content-Type', 'text/html');
  res.render('welcome');
})

module.exports = app;

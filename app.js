let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let appRouter = require('./router/appRouter');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use((req, res, next) => {
  res.header('Content-Type', 'application/json');
  next();
})

app.use('/api', appRouter);

app.get('/', (req, res) => {
  res.header('Content-Type', 'text/html');
  res.render('index');
})

module.exports = app;
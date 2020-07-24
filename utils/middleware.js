let app = require('./../app');

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
})
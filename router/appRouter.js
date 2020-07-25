let express = require('express');
let route = express.Router();
let { 
  getFromData,
  postFromData,
  getProjectToken 
} = require('./../controllers/appController');

route.get('/project-data', getFromData);
route.post('/project-data', postFromData);

route.post('/get-project-token', getProjectToken);

module.exports = route;
const express = require('express');
const route = express.Router();
const { 
  getFromData,
  postFromData,
  getProjectToken,
  getProjectList,
  updateURL 
} = require('./../controllers/appController');

/*** Get Request ***/
route.get('/project-data', getFromData);
route.get('/get-project-list', getProjectList);

/*** Post Request ***/
route.post('/project-data', postFromData);
route.post('/get-project-token', getProjectToken);
route.post('/update-domain-url', updateURL);

module.exports = route;
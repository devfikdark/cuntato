let express = require('express');
let route = express.Router();
let { 
  getData, 
  postData, 
  getFromData,
  postFromData 
} = require('./../controllers/appController');

route.get('/formtotable', getData);
route.post('/formtotable', postData);

route.get('/savedata',   getFromData);
route.post('/savedata', postFromData);

module.exports = route;
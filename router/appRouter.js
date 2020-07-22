let express = require('express');
let route = express.Router();
let { getData, postData } = require('./../controllers/appController');

route.get('/formtotable', getData);
route.post('/formtotable', postData);

module.exports = route;
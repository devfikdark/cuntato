let express = require('express');
let route = express.Router();

route.get('/google', getData);
route.get('/github', getData);
route.get('/linkedin', getData);

module.exports = route;
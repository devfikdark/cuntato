let dotEnv = require('dotenv');
dotEnv.config({ path: './config/config.env' });

let app = require('./app');

let port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log('Magic run on port 5000');
})
const dotEnv = require('dotenv');
dotEnv.config({ path: './config/config.env' });
require('./config/dbConfig');

const app = require('./app');

let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Magic run on port ${port}`);
})
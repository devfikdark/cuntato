import './../config/importEnv';
import '../config/dbConfig';

import app from './app';

const port = process.env.PORT || 3000;
app.listen(port , () => {
  console.log(`Magic run on ${port}`);
});
let mongoose = require('mongoose');

// cloud connection-Str
let cloudDB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(process.env.DATABASE_LOCAL, {
//mongoose.connect(cloudDB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}).then(() => {
  console.log('DB connect success :)');
}).catch((err) => {
  console.log('Something problem to connect DB !!!');
});
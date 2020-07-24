let mongoose = require('mongoose');

let fromDataSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "provide a name"]
  },
  email: {
    type: String,
    required: [true, "provide a valid email"]
  },
  message: {
    type: String,
    required: [true, "provide your message"]
  }
});

let fromDataModel = mongoose.model('fromData', fromDataSchema);

module.exports = fromDataModel;
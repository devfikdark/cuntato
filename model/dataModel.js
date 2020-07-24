let mongoose = require('mongoose');

let dataModelSchema = new mongoose.Schema({
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

let dataModel = mongoose.model('fromData', dataModelSchema);

module.exports = dataModel;
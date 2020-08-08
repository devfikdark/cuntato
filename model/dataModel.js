const mongoose = require('mongoose');

let dataModelSchema = new mongoose.Schema({
  data: {
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
    },
    createAt: String
  },
  _project: {
    type: String,
    required: [true, "provide your project token"]
  }
});

let dataModel = mongoose.model('fromData', dataModelSchema);

module.exports = dataModel;

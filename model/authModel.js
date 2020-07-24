let mongoose = require('mongoose');

let authModelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "provide a valid name"]
  },
  email: {
    type: String,
    required: [true, "provide a valid email"]
  },
  picture: {
    type: String,
    required: [true, "provide your profile picture"]
  }
});

let authModel = mongoose.model('userData', authModelSchema);

module.exports = authModel;
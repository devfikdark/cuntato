const mongoose = require('mongoose');

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
  },
  domain: {
    type: String
  }
});

let authModel = mongoose.model('authData', authModelSchema);

module.exports = authModel;
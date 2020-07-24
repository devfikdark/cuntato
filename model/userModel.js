let mongoose = require('mongoose');

let userModelSchema = new mongoose.Schema({
  _usertoken: {
    type: String,
    required: [true, "provide a user ID"]
  },
  _project: {
    type: String
  }
});

let userModel = mongoose.model('userData', userModelSchema);

module.exports = userModel;
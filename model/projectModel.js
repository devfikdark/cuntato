let mongoose = require('mongoose');

let projectModelSchema = new mongoose.Schema({
  _usertoken: {
    type: String,
    required: [true, "provide your user ID"]
  },
  _project: {
    type: String
  },
  _userdomain: String
});

let projectModel = mongoose.model('projectData', projectModelSchema);

module.exports = projectModel;
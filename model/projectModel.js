const mongoose = require('mongoose');

let projectModelSchema = new mongoose.Schema({
  _usertoken: {
    type: String,
    required: [true, "provide your user ID"]
  },
  _projecttoken: {
    type: String,
    unique: true
  },
  _projectname: {
    type: String,
    unique: true
  },
  _userdomain: String
});

let projectModel = mongoose.model('projectData', projectModelSchema);

module.exports = projectModel;
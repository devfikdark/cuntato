import * as mongoose from 'mongoose';

const projectModelSchema = new mongoose.Schema({
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

if (!mongoose.models.projectData) {
  mongoose.model('projectData', projectModelSchema);
}

const projectModel = mongoose.models.projectData;
export default projectModel;

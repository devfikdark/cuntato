import * as mongoose from 'mongoose';

const dataModelSchema = new mongoose.Schema({
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

if (!mongoose.models.fromData) {
  mongoose.model('fromData', dataModelSchema);
}

const dataModel = mongoose.models.fromData;
export default dataModel;

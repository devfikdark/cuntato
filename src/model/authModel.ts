import * as mongoose from 'mongoose';

const authModelSchema = new mongoose.Schema({
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

if (!mongoose.models.authData) {
  mongoose.model('authData', authModelSchema);
}

export default mongoose.models.authData;

const { mongoose } = require('../../configs/mongodb-config');

const UserSchema = new mongoose.Schema({
  email: {
    type: String, required: true, lowercase: true, unique: true,
  },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});
const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;

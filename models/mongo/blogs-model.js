const { mongoose } = require('../../configs/mongodb-config');

const BlogSchema = new mongoose.Schema({
  content: { type: String, required: true },
  _authorId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});
const BlogModel = mongoose.model('Blog', BlogSchema);

module.exports = BlogModel;

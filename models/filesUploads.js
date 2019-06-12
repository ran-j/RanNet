var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var FilesUploadSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true
  },
  link: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  creat_by: {
    type: Schema.Types.ObjectId,
    ref: 'Users'
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

var FilesUpload = mongoose.model('FilesUpload', FilesUploadSchema);

module.exports = FilesUpload;
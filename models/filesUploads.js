var mongoose = require('mongoose');

var FilesUploadSchema = new mongoose.Schema({
    nome: {
      type: String, 
      trim: true
    },     
    data: {
      type: String,
      required: true,
    },
    link: {
        type: String,
        required: true,
    },
    status: {
      type: String,
      required: true,
    },
  });

var FilesUpload = mongoose.model('FilesUpload', FilesUploadSchema);

module.exports = FilesUpload;
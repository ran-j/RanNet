var mongoose = require('mongoose');

var RavenSchema = new mongoose.Schema({
    Versao: {
      type: String, 
      required: true
    },     
});

var Raven = mongoose.model('Raven', RavenSchema);

module.exports = Raven;
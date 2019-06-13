var mongoose = require('mongoose');

var FlowMeterSchema = new mongoose.Schema({
  dado: {
    type: String, 
    required: true,
    trim: true
  },     
  data: {
    type: String,
    required: true,
  },
  hora: {
    type: String,
    required: true,
  }
});

var FlowMeter = mongoose.model('FlowMeter', FlowMeterSchema);

module.exports = FlowMeter;
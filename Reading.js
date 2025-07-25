const mongoose = require('mongoose');

const ReadingSchema = new mongoose.Schema({
  gasLevel: Number,        // gas concentration (ppm)
  smokeLevel: Number,      // smoke density
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Reading', ReadingSchema);

const express = require('express');
const router = express.Router();
const Reading = require('../models/Reading');
const sendSMS = require('../utils/sendSMS');
const sendPush = require('../utils/sendPush');

// Threshold for danger (adjustable)
const GAS_THRESHOLD = 300;

// Add a new sensor reading (or simulated one)
router.post('/readings', async (req, res) => {
  try {
    const { gasLevel, smokeLevel } = req.body;

    const reading = new Reading({ gasLevel, smokeLevel });
    await reading.save();

    // Check if alert needed
    if (gasLevel > GAS_THRESHOLD) {
      await sendSMS(`Warning! Gas level at ${gasLevel} ppm`);
      await sendPush(`Gas Alert!`, `Gas level critical: ${gasLevel} ppm`);
    }

    res.json({ success: true, message: 'Reading stored', reading });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Get all readings
router.get('/readings', async (req, res) => {
  try {
    const readings = await Reading.find().sort({ timestamp: -1 }).limit(50);
    res.json(readings);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;

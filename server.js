require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/api');
const Reading = require('./models/Reading');
const sendSMS = require('./utils/sendSMS');
const sendPush = require('./utils/sendPush');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api', apiRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// ---------------- SIMULATION SCRIPT ----------------
const GAS_THRESHOLD = 300;

setInterval(async () => {
  try {
    // Generate random readings (100–600 ppm for gas, 0–100 for smoke)
    const gasLevel = Math.floor(Math.random() * 500) + 100;
    const smokeLevel = Math.floor(Math.random() * 100);

    const reading = new Reading({ gasLevel, smokeLevel });
    await reading.save();

    console.log(`Simulated Reading: Gas ${gasLevel} ppm, Smoke ${smokeLevel}`);

    // Trigger alerts if gas is dangerous
    if (gasLevel > GAS_THRESHOLD) {
      await sendSMS(`Gas Alert! Level: ${gasLevel} ppm`);
      await sendPush(`Gas Alert!`, `Gas level critical: ${gasLevel} ppm`);
    }
  } catch (err) {
    console.error('Simulation error:', err);
  }
}, 10000); // Every 10 seconds

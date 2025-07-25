const admin = require('firebase-admin');
const serviceAccount = require('../firebase-service.json'); // Your Firebase service key

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

module.exports = async function sendPush(title, body) {
  try {
    const message = {
      notification: { title, body },
      topic: 'alerts' // Send to all subscribed devices
    };
    const response = await admin.messaging().send(message);
    console.log('Push Sent:', response);
  } catch (err) {
    console.error('Push Error:', err);
  }
};

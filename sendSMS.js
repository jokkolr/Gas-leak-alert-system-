const africastalking = require('africastalking')({
  apiKey: process.env.AT_API_KEY,
  username: process.env.AT_USERNAME
});

const sms = africastalking.SMS;

module.exports = async function sendSMS(message) {
  try {
    const result = await sms.send({
      to: [process.env.ALERT_PHONE],
      message
    });
    console.log('SMS Sent:', result);
  } catch (err) {
    console.error('SMS Error:', err);
  }
};

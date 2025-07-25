# Smart Gas & Fire Alert System (Work in Progress)

A **smart IoT safety system** that detects dangerous gas leaks and smoke levels, sends **instant SMS and push notifications**, and logs all readings on a **web dashboard** for monitoring.  
Currently in the **software simulation stage** (sensor data is auto-generated every 10 seconds) while hardware integration (ESP32 + MQ-2 sensors) is being finalized.

---

## Features
- **Real-time monitoring** of gas and smoke levels.
- **Automatic alerts** via:
  - SMS (using Africa’s Talking API)
  - Push notifications (via Firebase Cloud Messaging)
  - (Optional) Email alerts
- **Live API** to fetch recent sensor readings.
- **MongoDB database** for storing all readings and alerts.
- **Simulated data** for demo purposes until sensors are connected.

---

## API Endpoints
- `POST /api/readings` – Add new reading (sensor or simulated).
- `GET /api/readings` – Get the last 50 readings (latest first).
- (Coming soon) `/api/settings` – Update alert thresholds and contact info.

---

## How to Run Locally
1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/smart-gas-fire-alert-system.git
   cd smart-gas-fire-alert-system

# Ring Gate Sensor Monitor

This repository is a simple long-running script for monitoring a Ring contact sensor. It is designed to alert users via webhook when the sensor (for me, an outdoor gate sensor) remains open for longer than a specified time frame.

## Installation

Follow these steps to set up the project:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/ring-gate-sensor-monitor.git
   cd ring-gate-sensor-monitor
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configuration:**

- Get your Ring refresh token from (https://github.com/dgreif/ring/wiki/Refresh-Tokens)

  ```
  cp .env.example .env
  ```

  - Modify the `.env` file with your Ring refresh token, location ID, and alarm ID, and webhook destination. You can get these values from: (https://github.com/dgreif/ring/wiki/Data-Discovery)

## Usage

To start monitoring your Ring gate sensor, run:

```bash
npm start
```

This will start the application, which listens for updates from your contact sensor. If the gate remains open longer than the configured time frame, your webhook destination will receive a POST request.

## Running with Docker

To run this application using Docker, follow these steps:

1. **Build the Docker image:**

   ```bash
   docker build -t ring-gate-sensor-monitor .
   ```

2. **Run the Docker container:**

   Make sure you copy the .env file from the example and fill out your Ring values.

   ```bash
   docker run --env-file .env -d ring-gate
   ```

## Customizing Alert Time Frame

To change the time frame for alerts, modify the `ALERT_TIME_FRAME` variable in the `.env` file:

```
ALERT_TIME_FRAME=10  # Time in seconds
```

## Contributing

Contributions to this project are welcome. Please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

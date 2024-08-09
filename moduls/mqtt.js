const mqtt = require("mqtt");
const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
// const MQTT_HOST_NAME = "mqtt://127.0.0.1:1883";

// const mqttClient = new mqttServices(MQTT_HOST_NAME);

// mqttClient.connect();

// mqttClient.subscribe("data/pm/ATS", (err) => {
//     if(!err) {
//         console.log("Connected");
//     }
// });
const option = {
  username: "ereh",
  password: "ereh",
};

class mqttServices {
  constructor(host) {
    this.mqttClient = null;
    this.host = host;
  }

  connect() {
    this.mqttClient = mqtt.connect(this.host, option);

    this.mqttClient.on("error", (err) => {
      console.log(err);
      this.mqttClient.end();
    });

    this.mqttClient.on("connect", () => {
      console.log("MQTT Client Connected");
    });

    this.mqttClient.on("message", (topic, message) => {
      console.log(JSON.parse(message));
    });

    this.mqttClient.on("close", () => {
      console.log("MQTT Client Disconnected");
    });
  }

  publish(topic, message, option) {
    this.mqttClient.publish(topic, message);
  }

  subscribe(topic, option) {
    this.mqttClient.subscribe(topic, option);
  }
}

module.exports = mqttServices;

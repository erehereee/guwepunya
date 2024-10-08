require("dotenv").config();
const http = require("http");
const app = require("./services/app");
const wsStart = require("./services/dataClient");
const { checkConnection, initialDBSet } = require("./helper/helperdb");
const { DateTime } = require("luxon");

async function startServer() {
  const isConnected = await checkConnection();

  if (isConnected) {
    await initialDBSet();

    const server = http.createServer(app);
    const mqtt = require("./services/insertData");
    const port = process.env.PORT_SERVER;

    wsStart(server);

    server.listen(port, () => {
      console.log(`Server listening on ${process.env.LOCALHOST}:${port}`);
    });
  } else {
    console.error("Cannot start server : Database Connection Failed");
    process.exit(1);
  }
}

startServer();

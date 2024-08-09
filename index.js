const http = require("http");
const app = require("./services/app");
const initializeSocket = require("./services/data");
const { checkConnection } = require("./helper/helperdb");

async function startServer() {
  const isConnected = await checkConnection();

  if (isConnected) {
    const server = http.createServer(app);
    const io = require("socket.io")(server);
    const port = 3000;

    initializeSocket(io);

    server.listen(port, () => {
      console.log(`Server listening on port : ${port}`);
    });
  } else {
    console.error("Cannot start server : Database Connection Failed");
    process.exit(1);
  }
}

startServer();

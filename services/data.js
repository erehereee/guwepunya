const { query } = require("../helper/helperdb");

function initializeSocket(io) {
  io.on("connection", async (socket) => {
    console.log(`Socket Connected : ${socket.id}`);

    setInterval(async () => {
      const queryData = `SELECT iaData, ibData, icData, vabData, vbcData, vcaData from data order by id desc limit 1 `;
      const result = await query(queryData);
      result.rows.forEach((e) => {
        socket.emit("iadata", e.iadata);
        socket.emit("ibdata", e.ibdata);
        socket.emit("icdata", e.icdata);
        socket.emit("vabdata", e.vabdata);
        socket.emit("vbcdata", e.vbcdata);
        socket.emit("vcadata", e.vcadata);
      });
    }, 1000);
  });
}

module.exports = initializeSocket;

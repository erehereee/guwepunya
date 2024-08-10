const { query } = require("../helper/helperdb");

function initializeSocket(io) {
  io.on("connection", async (socket) => {
    console.log(`Socket Connected : ${socket.id}`);

    setInterval(async () => {
      const queryData = `SELECT iaData, ibData, icData, vabData, vbcData, vcaData, vanData, vbnData, vcnData from data order by id desc limit 1 `;
      const result = await query(queryData);
      result.rows.forEach((e) => {
        socket.emit("iadata", e.iadata);
        socket.emit("ibdata", e.ibdata);
        socket.emit("icdata", e.icdata);
        socket.emit("vabdata", e.vabdata);
        socket.emit("vbcdata", e.vbcdata);
        socket.emit("vcadata", e.vcadata);
        socket.emit("vandata", e.vandata);
        socket.emit("vbndata", e.vbndata);
        socket.emit("vcndata", e.vcndata);
      });
    }, 1000);
  });
}

module.exports = initializeSocket;

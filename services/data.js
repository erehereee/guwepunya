const { query } = require("../helper/helperdb");

let date = new Intl.DateTimeFormat("fr-CA", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
}).format(new Date());

let dateFragment = date.split("-");

async function getCummon(socket) {
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
}

async function getToday(socket) {
  const queryData = `SELECT data_daily FROM calculate_daily WHERE date(timestamp) = date('${date}'::timestamptz)`;
  const result = await query(queryData);
  result.rows.forEach((e) => {
    const total_daily = e.data_daily / 1000;
    socket.emit(
      "data_daily",
      total_daily.toLocaleString("id-ID").split(",")[0]
    );
  });
}

async function getMonth(socket) {
  const queryData = `SELECT CAST(data_monthly AS numeric) FROM calculate_monthly WHERE 
    EXTRACT(YEAR FROM timestamp) = ${dateFragment[0]}
    AND EXTRACT(MONTH FROM timestamp) = ${dateFragment[1]};
`;
  const result = await query(queryData);
  result.rows.forEach((e) => {
    const total_monthly = e.data_monthly / 1000;

    const tarif = 1.444;
    let dataTarif = total_monthly * tarif * 1000000;

    let newAmount = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(dataTarif);

    socket.emit(
      "data_monthly",
      total_monthly.toLocaleString("id-ID").split(",")[0]
    );
    socket.emit("cost", newAmount);
  });
}

async function graphA(socket) {
  const data = [
    Math.floor(Math.random() * 101),
    Math.floor(Math.random() * 101),
    Math.floor(Math.random() * 101),
    Math.floor(Math.random() * 101),
    Math.floor(Math.random() * 101),
    Math.floor(Math.random() * 101),
    Math.floor(Math.random() * 101),
    Math.floor(Math.random() * 101),
    Math.floor(Math.random() * 101),
    Math.floor(Math.random() * 101),
    Math.floor(Math.random() * 101),
    Math.floor(Math.random() * 101),
  ];
  socket.emit("graphA", data);
}

async function graphB(socket) {
  const data = [
    Math.floor(Math.random() * 101),
    Math.floor(Math.random() * 101),
    Math.floor(Math.random() * 101),
    Math.floor(Math.random() * 101),
    Math.floor(Math.random() * 101),
    Math.floor(Math.random() * 101),
    Math.floor(Math.random() * 101),
    Math.floor(Math.random() * 101),
    Math.floor(Math.random() * 101),
    Math.floor(Math.random() * 101),
    Math.floor(Math.random() * 101),
    Math.floor(Math.random() * 101),
  ];
  socket.emit("graphB", data);
}

async function graphC(socket) {
  const data = [
    Math.floor(Math.random() * 101),
    Math.floor(Math.random() * 101),
    Math.floor(Math.random() * 101),
    Math.floor(Math.random() * 101),
    Math.floor(Math.random() * 101),
    Math.floor(Math.random() * 101),
    Math.floor(Math.random() * 101),
    Math.floor(Math.random() * 101),
    Math.floor(Math.random() * 101),
    Math.floor(Math.random() * 101),
    Math.floor(Math.random() * 101),
    Math.floor(Math.random() * 101),
  ];
  socket.emit("graphC", data);
}

function initializeSocket(io) {
  io.on("connection", async (socket) => {
    console.log(`Socket Connected : ${socket.id}`);

    setInterval(async () => {
      await graphA(socket);
      await graphB(socket);
      await graphC(socket);
      // await getCummon(socket);
      // await getToday(socket);
      // await getMonth(socket);
    }, 1000);
  });
}

module.exports = initializeSocket;

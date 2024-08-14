const { Server } = require("socket.io");
const { query } = require("../helper/helperdb");

let date = new Intl.DateTimeFormat("fr-CA", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
}).format(new Date());

let dateFragment = date.split("-");

async function getCummon(socket) {
  const queryData = `SELECT vabData, vbcData, vcaData, vanData, vbnData, vcnData from data order by id desc limit 1 `;
  const result = await query(queryData);
  socket.emit("dataCummon", result.rows);
}

async function getToday(socket) {
  const queryData = `SELECT data_daily FROM calculate_daily WHERE date(timestamp) = date('${date}'::timestamptz)`;
  const result = await query(queryData);
  socket.emit("dataToday", result.rows);
}

async function getMonth(socket) {
  const queryData = `SELECT CAST(data_monthly AS numeric) FROM calculate_monthly WHERE 
    EXTRACT(YEAR FROM timestamp) = ${dateFragment[0]}
    AND EXTRACT(MONTH FROM timestamp) = ${dateFragment[1]};
`;
  const result = await query(queryData);
  socket.emit("dataMonthly", result.rows);
}

async function graphA(socket) {
  const queryData = `SELECT 
    data_daily
FROM 
    calculate_daily
WHERE 
    date(timestamp) = date('${date}'::timestamptz);`;
  const result = await query(queryData);
  socket.emit("dailyData", result.rows);
}

async function graphB(socket) {
  const queryData = `SELECT 
    EXTRACT(DAY FROM timestamp) AS day,
    data_daily
FROM 
    calculate_daily
WHERE 
    to_char(timestamp, 'YYYY-MM') = '${dateFragment[0]}-${dateFragment[1]}'
ORDER BY 
    day;`;
  const result = await query(queryData);
  socket.emit("monthData", result.rows);
}

async function graphC(socket) {
  const queryData = `SELECT
      EXTRACT(MONTH FROM timestamp) AS month,
      data_monthly
  FROM
      calculate_monthly
  WHERE
      EXTRACT(YEAR FROM timestamp) = ${dateFragment[0]}
  ORDER BY
      month;`;
  const result = await query(queryData);
  socket.emit("yearData", result.rows);
}

function initializeSocket(server) {
  const io = new Server(server);
  io.on("connection", async (socket) => {
    console.log(`Socket Connected : ${socket.id}`);

    setInterval(async () => {
      // await graphA(socket);
      await graphB(socket);
      await graphC(socket);
      await getCummon(socket);
      await getToday(socket);
      await getMonth(socket);
    }, 1000);
  });
}

module.exports = initializeSocket;

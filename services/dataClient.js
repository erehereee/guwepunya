const { Server } = require("socket.io");
const { query } = require("../helper/helperdb");
const { DateTime } = require("luxon");

let getDate = DateTime.now();
let newFormatMonth = getDate.toFormat("MM");
let date = getDate.toISO().split("T")[0];

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
    EXTRACT(YEAR FROM timestamp) = ${getDate.year}
    AND EXTRACT(MONTH FROM timestamp) = ${newFormatMonth};
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
    to_char(timestamp, 'YYYY-MM') = '${getDate.year}-${newFormatMonth}'
ORDER BY 
    day;`;
  // console.log(queryData);
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
      EXTRACT(YEAR FROM timestamp) = ${getDate.year}
  ORDER BY
      month;`;
  const result = await query(queryData);
  socket.emit("yearData", result.rows);
}

function initializeSocket(server) {
  const io = new Server(server);
  io.on("connection", async (socket) => {
    console.log(`Socket Connected : ${socket.id}`);

    setInterval(() => {
      // await graphA(socket);
      graphB(socket);
      graphC(socket);
      getCummon(socket);
      getToday(socket);
      getMonth(socket);
    }, 1000);
  });
}

module.exports = initializeSocket;

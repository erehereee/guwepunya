const { Server } = require("socket.io");
const { query } = require("../helper/helperdb");
const { DateTime } = require("luxon");

async function getCummon(socket) {
  const queryData = `SELECT vabData, vbcData, vcaData, vanData, vbnData, vcnData from data order by id desc limit 1 `;
  const result = await query(queryData);
  socket.emit("dataCummon", result.rows);
}

async function getToday(socket, date) {
  const queryData = `SELECT data_daily FROM calculate_daily WHERE date(timestamp) = date('${date}'::timestamptz)`;
  const result = await query(queryData);
  socket.emit("dataToday", result.rows);
}

async function getMonth(socket, newFormatMonth, year) {
  const queryData = `SELECT CAST(data_monthly AS numeric) FROM calculate_monthly WHERE 
    EXTRACT(YEAR FROM timestamp) = ${year}
    AND EXTRACT(MONTH FROM timestamp) = ${newFormatMonth};
`;

  const result = await query(queryData);
  socket.emit("dataMonthly", result.rows);
}

async function graphA(socket, date) {
  const queryData = `SELECT 
    vabdata,
    vbcdata,
    vcadata
FROM 
    data
ORDER BY 
    id DESC
LIMIT 1`;
  const result = await query(queryData);
  socket.emit("dailyData", result.rows);
}

async function graphB(socket, newFormatMonth, year) {
  const queryData = `SELECT 
    EXTRACT(DAY FROM timestamp) AS day,
    data_daily
FROM 
    calculate_daily
WHERE 
    to_char(timestamp, 'YYYY-MM') = '${year}-${newFormatMonth}'
ORDER BY 
    day;`;
  // console.log(queryData);
  const result = await query(queryData);
  socket.emit("monthData", result.rows);
}

async function graphC(socket, year) {
  const queryData = `SELECT
      EXTRACT(MONTH FROM timestamp) AS month,
      data_monthly
  FROM
      calculate_monthly
  WHERE
      EXTRACT(YEAR FROM timestamp) = ${year}
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
      let getDate = DateTime.now();
      let date = getDate.toISO().split("T")[0];
      let newFormatMonth = getDate.toFormat("MM");
      let year = getDate.year;
      graphA(socket, date);
      graphB(socket, newFormatMonth, year);
      graphC(socket, year);
      getCummon(socket);
      getToday(socket, date);
      getMonth(socket, newFormatMonth, year);
    }, 1000);
  });
}

module.exports = initializeSocket;

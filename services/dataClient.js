const { Server } = require("socket.io");
const { query } = require("../helper/helperdb");
const { DateTime } = require("luxon");

async function getCummon(socket) {
  const queryData = `SELECT vabData, vbcData, vcaData, vanData, vbnData, vcnData from data order by id desc limit 1 `;
  const result = await query(queryData);
  socket.emit("dataCummon", result.rows);
}

async function getBiogas(socket) {
  const queryData = `SELECT ft_101, ft_102, ft_201, ft_301, ft_401, ft_402, ft_601, ae_201, ae_202, ae_301, ae_401, ae_402, ae_501, ae_601, pt_401, pt_901, pt_902, pt_201, le_201 from analog_input where id = 1`;
  const result = await query(queryData);
  socket.emit("dataBiogas", result.rows);
}

async function getToday(socket, date) {
  const queryData = `SELECT data_daily FROM calculate_daily WHERE date(timestamp) = date('${date}'::timestamptz)`;
  const result = await query(queryData);
  socket.emit("dataToday", result.rows);
}

// async function getMonth(socket, newFormatMonth, year) {
//   const queryData = `SELECT CAST(data_monthly AS numeric) FROM calculate_monthly WHERE
//     EXTRACT(YEAR FROM timestamp) = ${year}
//     AND EXTRACT(MONTH FROM timestamp) = ${newFormatMonth};
// `;
// }

async function getMonth(socket, newFormatMonth, year, date) {
  const queryData = `SELECT
    SUM(CAST(data_daily as numeric)),
    DATE_TRUNC('month', '${date}'::timestamptz)
FROM
    calculate_daily
WHERE
    EXTRACT(YEAR FROM timestamp) = ${year}
    AND EXTRACT(MONTH FROM timestamp) = ${newFormatMonth}
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
      EXTRACT(MONTH FROM time_monthly) AS month,
      max_monthly
  FROM
      monthly
  WHERE
      EXTRACT(YEAR FROM time_monthly) = ${year}
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
      getBiogas(socket);
      getToday(socket, date);
      getMonth(socket, newFormatMonth, year, date);
    }, 1000);
  });
}

module.exports = initializeSocket;

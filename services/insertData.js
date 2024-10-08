require("dotenv").config();
const { DateTime } = require("luxon");
const client = require("mqtt");
const { query } = require("../helper/helperdb");

const option = {
  username: "ereh",
  password: "ereh",
};

const mqtt = client.connect(process.env.MQTT_SERVER, option);

mqtt.on("connect", () => {
  mqtt.subscribe("data/pm/ATS", (err) => {
    if (!err) {
      console.log("Success to subscribe the ESP data.");
    } else {
      console.log("Cant subscribe the ESP Data");
    }
  });
});

mqtt.on("message", async (topic, message) => {
  const data = JSON.parse(message);
  const queryData = `INSERT INTO data
    (
      iadata, ibdata, icdata, iavgdata,
      vabdata, vbcdata, vcadata, vandata,
      vbndata, vcndata, kwdata, deliverydata,
      receiveddata
     ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13);`;

  const values = [
    data.iaData,
    data.ibData,
    data.icData,
    data.iavgData,
    data.vabData,
    data.vbcData,
    data.vcaData,
    data.vanData,
    data.vbnData,
    data.vcnData,
    data.kWData,
    data.deliveryData,
    data.receivedData,
  ];
  try {
    const result = await query(queryData, values);
    console.log("Success to insert Cummon Data");
  } catch (err) {
    console.log("Failed to insert data : ", err);
  }
});

mqtt.on("error", (err) => {
  console.log(err);
  mqtt.end();
});

async function insertMaxDaily(dateNowFormat) {
  const queryData = `insert into daily (max_daily, time_daily) 
select MAX(CAST(deliverydata as numeric)), '${dateNowFormat}'::timestamptz
from data 
where date(timestamp) = date('${dateNowFormat}'::timestamptz)
ON CONFLICT (time_daily) DO UPDATE
SET max_daily = EXCLUDED.max_daily;`;
  try {
    await query(queryData);
    console.log("Success to insert Max Daily Data");
  } catch (err) {
    console.log("Failed to insert data : ", err);
  }
}

async function insertCalculateDaily(dateNowFormat, dateYesterdayFormat) {
  const queryData = `WITH max_data AS (
    SELECT 
        DATE(time_daily) AS day,
        MAX(max_daily::numeric) AS max_kWData
    FROM daily
    WHERE DATE(time_daily) IN ('${dateNowFormat}', '${dateYesterdayFormat}')
    GROUP BY DATE(time_daily)
),
daily_difference AS (
    SELECT
        day,
        max_kWData - LAG(max_kWData, 1) OVER (ORDER BY day) AS daily_difference
    FROM max_data
)
INSERT INTO calculate_daily (data_daily, timestamp)
SELECT
    daily_difference,
    day
FROM daily_difference
WHERE day = '${dateNowFormat}'
ON CONFLICT (timestamp) DO UPDATE
SET data_daily = EXCLUDED.data_daily;`;
  try {
    await query(queryData);
    console.log("Success to insert Calculate Daily Data");
  } catch (err) {
    console.log("Failed to insert data : ", err);
  }
}

async function insertMaxMonthly(dateNowFormat, newFormatMonth, year) {
  const queryData = `insert into monthly (max_monthly, time_monthly) 
SELECT 
    SUM(CAST(data_daily as numeric)),
    DATE_TRUNC('month', '${dateNowFormat}'::timestamptz)
FROM 
    calculate_daily
WHERE 
    EXTRACT(YEAR FROM timestamp) = ${year}
    AND EXTRACT(MONTH FROM timestamp) = ${newFormatMonth}
ON CONFLICT (time_monthly) DO UPDATE
SET max_monthly = EXCLUDED.max_monthly;`;

  try {
    await query(queryData);

    console.log("Success to insert Max Monthly Data");
  } catch (err) {
    console.log("Failed to insert data : ", err);
  }
}

async function insertCalculateMonthly(nowMonth, prevMonth) {
  const queryData = `WITH monthly_data AS (
    SELECT
        DATE_TRUNC('month', time_monthly::timestamptz) AS month,
        MAX(max_monthly::numeric) AS max_daily_difference
    FROM monthly
    WHERE DATE_TRUNC('month', time_monthly::timestamptz) IN (DATE_TRUNC('month', '${nowMonth}'::timestamptz), DATE_TRUNC('month', '${prevMonth}'::timestamptz))
    GROUP BY DATE_TRUNC('month', time_monthly::timestamptz)
),
monthly_difference AS (
    SELECT
        month,
        max_daily_difference - LAG(max_daily_difference, 1) OVER (ORDER BY month) AS total_monthly
    FROM monthly_data
)
INSERT INTO calculate_monthly (data_monthly, timestamp)
SELECT
    total_monthly,
    month
FROM monthly_difference
WHERE month = DATE_TRUNC('month', '${nowMonth}'::timestamptz)
ON CONFLICT (timestamp) DO UPDATE
SET data_monthly = EXCLUDED.data_monthly;`;
  try {
    await query(queryData);
    console.log(queryData);
    console.log("Success to insert Calculate Monthly Data");
  } catch (err) {
    console.log("Failed to insert data : ", err);
  }
}

setInterval(() => {
  let date = DateTime.now();
  let dateNowFormat = date.toISO().split("T")[0];
  let dateYesterdayFormat = date.minus({ days: 1 }).toISO().split("T")[0];
  let newFormatMonth = date.toFormat("MM");
  let year = date.year;
  let prevMonth = date
    .minus({ months: 1 })
    .set({ day: 1 })
    .toISO()
    .split("T")[0];
  let nowMonth = date.set({ day: 1 }).toISO().split("T")[0];

  insertMaxDaily(dateNowFormat);
  insertMaxMonthly(dateNowFormat, newFormatMonth, year);
  insertCalculateDaily(dateNowFormat, dateYesterdayFormat);
  insertCalculateMonthly(nowMonth, prevMonth);
}, 11000);

// const setTest = () => {
//   let date = DateTime.now();
//   let dateNowFormat = date.toISO().split("T")[0];
//   let dateYesterdayFormat = date.minus({ days: 1 }).toISO().split("T")[0];
//   let newFormatMonth = date.toFormat("MM");
//   let year = date.year;
//   let prevMonth = date
//     .minus({ months: 1 })
//     .set({ day: 1 })
//     .toISO()
//     .split("T")[0];
//   let nowMonth = date.set({ day: 1 }).toISO().split("T")[0];

//   insertMaxDaily(dateNowFormat);
//   insertMaxMonthly(dateNowFormat, newFormatMonth, year);
//   insertCalculateDaily(dateNowFormat, dateYesterdayFormat);
//   insertCalculateMonthly(nowMonth, prevMonth);
// };

// setTest();

module.exports = mqtt;

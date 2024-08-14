require("dotenv").config();
const client = require("mqtt");
const { query } = require("../helper/helperdb");

const option = {
  username: "ereh",
  password: "ereh",
};
let dateNow = new Date();

let dateNowFormat = new Intl.DateTimeFormat("fr-CA", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
}).format(dateNow);

let dateYesterdayFormat = new Intl.DateTimeFormat("fr-CA", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
}).format(dateNow.setDate(dateNow.getDate() - 1));

let dateFragment = dateNowFormat.split("-");

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
  console.log(JSON.parse(message));
  //   const data = JSON.parse(message);
  //   const queryData = `INSERT INTO data
  //   (
  //     iadata, ibdata, icdata, iavgdata,
  //     vabdata, vbcdata, vcadata, vandata,
  //     vbndata, vcndata, kwdata, deliverydata,
  //     receiveddata
  //    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13);`;

  //   const values = [
  //     data.iaData,
  //     data.ibData,
  //     data.icData,
  //     data.iavgData,
  //     data.vabData,
  //     data.vbcData,
  //     data.vcaData,
  //     data.vanData,
  //     data.vbnData,
  //     data.vcnData,
  //     data.kWData,
  //     data.deliveryData,
  //     data.receivedData,
  //   ];

  //   const result = await query(queryData, values);
});

mqtt.on("error", (err) => {
  console.log(err);
  mqtt.end();
});

async function insertMaxDaily() {
  const queryData = `insert into daily (max_daily, time_daily) 
select MAX(CAST(deliverydata as numeric)), '${dateNowFormat}'::timestamptz
from data 
where date(timestamp) = date('${dateNowFormat}'::timestamptz)
ON CONFLICT (time_daily) DO UPDATE
SET max_daily = EXCLUDED.max_daily;`;
}

async function insertCalculateDaily() {
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
}

async function insertMaxMonthly() {
  const queryData = `insert into monthly (max_monthly, time_monthly) 
SELECT 
    SUM(CAST(data_daily as numeric)),
	DATE_TRUNC('month', '${dateNowFormat}'::timestamptz)
FROM 
    calculate_daily
WHERE 
    EXTRACT(YEAR FROM timestamp) = ${dateFragment[0]}
    AND EXTRACT(MONTH FROM timestamp) = ${dateFragment[1]}
ON CONFLICT (time_monthly) DO UPDATE
SET max_monthly = EXCLUDED.max_monthly;`;
}

//   async function insertCalculateMonthly() {
//     const queryData = `WITH monthly_data AS (
//     SELECT
//         DATE_TRUNC('month', time_monthly::timestamptz) AS month,
//         MAX(max_monthly::numeric) AS max_daily_difference
//     FROM monthly
//     WHERE DATE_TRUNC('month', time_monthly::timestamptz) IN (DATE_TRUNC('month', '${currentMonth}'::timestamptz), DATE_TRUNC('month', '${earlyMonth}'::timestamptz))
//     GROUP BY DATE_TRUNC('month', time_monthly::timestamptz)
// ),
// monthly_difference AS (
//     SELECT
//         month,
//         max_daily_difference - LAG(max_daily_difference, 1) OVER (ORDER BY month) AS total_monthly
//     FROM monthly_data
// )
// INSERT INTO calculate_monthly (data_monthly, timestamp)
// SELECT
//     total_monthly,
//     month
// FROM monthly_difference
// WHERE month = DATE_TRUNC('month', '${currentMonth}'::timestamptz)
// ON CONFLICT (timestamp) DO UPDATE
// SET data_monthly = EXCLUDED.data_monthly;`;
//   }

setInterval(() => {});

module.exports = mqtt;

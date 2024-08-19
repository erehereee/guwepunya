let count = 1;
let chart;

const ctx = document.getElementById("energy-chart").getContext("2d");

const bNext = document.querySelector(".head .bx-chevron-right");
const bPrev = document.querySelector(".head .bx-chevron-left");
const title = document.querySelector(".head p");

function label(locale = "default") {
  const monthNames = Array.from({ length: 12 }, (_, i) => {
    const date = new Date(2024, i, 1); // Tahun tidak mempengaruhi nama bulan
    return date.toLocaleString(locale, { month: "long" });
  });

  return monthNames;
}

function getTimes() {
  const now = new Date();

  const year = now.getFullYear();
  const month = now.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const daysArray = Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1;
    const monthName = now.toLocaleString("default", { month: "short" });
    return `${day}-${monthName}`;
  });
  return daysArray;
}

function createChart(labels, typeChart, count) {
  if (chart) {
    chart.destroy(); // Hancurkan grafik yang ada sebelumnya
  }

  // Tentukan jumlah dataset berdasarkan count
  const datasets = [];
  if (count === 1) {
    datasets.push(
      {
        label: "R Voltage",
        data: [], // Data akan diisi nanti saat update
        backgroundColor: "rgba(255, 0, 0, 0.2)",
        borderColor: "#ff1100",
        borderWidth: 1,
        pointBackgroundColor: "#ff1100",
        pointBorderColor: "#ff1100",
        pointRadius: 5,
        fill: true,
      },
      {
        label: "S Voltage",
        data: [], // Data akan diisi nanti saat update
        backgroundColor: "rgba(255, 196, 0, 0.2)",
        borderColor: "#ffc400",
        borderWidth: 1,
        pointBackgroundColor: "#ffc400",
        pointBorderColor: "#ffc400",
        pointRadius: 5,
        fill: true,
      },
      {
        label: "T Voltage",
        data: [], // Data akan diisi nanti saat update
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        borderColor: "##000000",
        borderWidth: 1,
        pointBackgroundColor: "##000000",
        pointBorderColor: "##000000",
        pointRadius: 5,
        fill: true,
      }
    );
  } else {
    datasets.push({
      label: "Dataset 1",
      data: [], // Data akan diisi nanti saat update
      backgroundColor: "rgba(60, 145, 230, 0.5)",
      borderColor: "#3C91E6",
      borderWidth: 1,
      pointBackgroundColor: "#3C91E6",
      pointBorderColor: "#3C91E6",
      pointRadius: 5,
      fill: true,
    });
  }

  chart = new Chart(ctx, {
    type: typeChart,
    data: {
      labels: labels,
      datasets: datasets,
    },
    options: {
      plugins: {
        legend: {
          display: true,
        },
      },
      responsive: true,
      scales: {
        x: {
          grid: {
            color: "black",
          },
          ticks: {
            color: "black",
          },
        },
        y: {
          beginAtZero: true,
          grid: {
            color: "black",
          },
          ticks: {
            color: "black",
          },
        },
      },
    },
  });
}

function updateGraph(count) {
  let labels;
  let type;
  switch (count) {
    case 1:
      type = "line";
      labels = [];
      title.textContent = "Power Graph";
      break;
    case 2:
      type = "line";
      labels = getTimes();
      title.textContent = "This Month";
      break;
    case 3:
      type = "bar";
      labels = label();
      title.textContent = "This Year";
      break;
    default:
      console.log("Invalid count");
  }
  createChart(labels, type, count); // Tambahkan count sebagai parameter
}

updateGraph(count);

socket.on("connect", () => {
  function removeAllListeners() {
    socket.off("dailyData");
    socket.off("monthData");
    socket.off("yearData");
  }

  function addListener(event, callback) {
    removeAllListeners();
    socket.on(event, callback);
  }

  bNext.addEventListener("click", () => {
    count = (count % 3) + 1;
    updateGraph(count);
    setupSocketListeners();
  });

  bPrev.addEventListener("click", () => {
    count = count - 1 < 1 ? 3 : count - 1;
    updateGraph(count);
    setupSocketListeners();
  });

  function setupSocketListeners() {
    if (count === 1) {
      addListener("dailyData", (message) => {
        const data1 = chart.data.datasets[0].data;
        const data2 = chart.data.datasets[1].data;
        const data3 = chart.data.datasets[2].data;
        const labels = chart.data.labels;

        if (data1.length >= 20) {
          data1.shift();
          data2.shift();
          data3.shift();
          labels.shift();
        }

        message.forEach((e) => {
          const date = new Date().toLocaleTimeString("en-US", {
            hourCycle: "h24",
          });
          const result1 = e.vabdata;
          const result2 = e.vbcdata;
          const result3 = e.vcadata;

          data1.push(result1);
          data2.push(result2);
          data3.push(result3);
          labels.push(date);

          chart.update();
        });
      });
    }
    if (count === 2) {
      addListener("monthData", (message) => {
        const data = getTimes();
        message.map((e) => {
          const days = e.day - 1;
          data[days] = e.data_daily / 1000;
        });
        chart.data.labels = getTimes();
        chart.data.datasets[0].data = data;
        chart.data.datasets[0].backgroundColor = "rgba(60, 145, 230, 0.2)";
        chart.data.datasets[0].label = "This Month Data";
        chart.update();
      });
    } else if (count === 3) {
      addListener("yearData", (message) => {
        const data = label();
        message.map((e) => {
          const month = e.month - 1;
          data[month] = e.data_monthly / 1000;
        });
        chart.data.datasets[0].data = data;
        chart.data.datasets[0].backgroundColor = "#3C91E6";
        chart.data.datasets[0].label = "This Year Data";
        chart.update();
      });
    }
  }

  setupSocketListeners();
});

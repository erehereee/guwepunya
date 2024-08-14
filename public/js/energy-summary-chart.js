let count = 1;
let chart;

const ctx = document.getElementById("energy-chart").getContext("2d");

const bNext = document.querySelector(".head .bx-chevron-right");
const bPrev = document.querySelector(".head .bx-chevron-left");
const title = document.querySelector(".head p");

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

function createChart(labels, data, graphType) {
  if (chart) {
    chart.destroy(); // Destroy the existing chart
  }

  chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: `Graph ${graphType}`,
          data: data,
          backgroundColor: "#3C91E6",
          borderColor: "#424242",
          borderWidth: 1,
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          display: false,
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

function updateGraphData(graphType) {
  let data;
  let labels;

  switch (graphType) {
    case "A":
      labels = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      data = [65, 59, 80, 81, 56, 55, 40];
      break;
    case "B":
      labels = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      data = [28, 48, 40, 19, 86];
      break;
    // case "C":
    //   labels = [
    //     "January",
    //     "February",
    //     "March",
    //     "April",
    //     "May",
    //     "June",
    //     "July",
    //     "August",
    //     "September",
    //     "October",
    //     "November",
    //     "December",
    //   ];
    //   data = [12, 19, 3, 5, 2, 3];
    //   break;
    default:
      console.error("Invalid graph type");
      return;
  }

  createChart(labels, data, graphType);
}

function updateGraph(count) {
  switch (count) {
    // case 1:
    //   updateGraphData("A");
    //   title.textContent = "Daily";
    //   break;
    case 1:
      updateGraphData("A");
      title.textContent = "This Month";
      break;
    case 2:
      updateGraphData("B");
      title.textContent = "This Year";
      break;
    default:
      console.log("Invalid count");
  }
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
    count = (count % 2) + 1;
    updateGraph(count);
    setupSocketListeners();
  });

  bPrev.addEventListener("click", () => {
    count = count - 1 < 1 ? 2 : count - 1;
    updateGraph(count);
    setupSocketListeners();
  });

  function setupSocketListeners() {
    // if (count === 1) {
    //   // addListener("dailyData", (message) => {
    //   //   // console.log(message);
    //   //   const data = [];
    //   //   message.forEach((e) => {
    //   //     console.log(e.data_daily);
    //   //     // data.push(e);
    //   //     // if (data.length == 10) {
    //   //     //   data.push(e.data_daily);
    //   //     //   data.unshift();
    //   //     // }
    //   //   });
    //   //   // console.log(data);
    //   //   // chart.data.datasets[0].data = message;
    //   //   // chart.update();
    //   // });
    // }
    if (count === 1) {
      addListener("monthData", (message) => {
        const data = getTimes();
        message.map((e) => {
          const days = e.day - 1;
          data[days] = e.data_daily / 1000;
        });
        chart.data.labels = getTimes();
        chart.data.datasets[0].data = data;
        chart.data.datasets[0].label = "This Month Data";
        chart.update();
      });
    } else if (count === 2) {
      addListener("yearData", (message) => {
        const data = new Array(12).fill(0);
        message.map((e) => {
          const month = e.month - 1;
          data[month] = e.data_monthly / 1000;
        });
        chart.data.datasets[0].data = data;
        chart.data.datasets[0].label = "This Year Data";
        chart.update();
      });
    }
  }

  setupSocketListeners();
});

let ctx = document.getElementById("energy-chart").getContext("2d");

let chart = new Chart(ctx, {
  type: "line",
  data: {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [],
        backgroundColor: "#FFB1C1",
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

let updateData = function (value) {
  let data = chart.data.datasets[0].data;
  if (data.length == 6) {
    data.shift();
    data.push(value);
  } else {
    data.push(value);
  }
  chart.update();
};

// let xhr = new XMLHttpRequest();
// xhr.onreadystatechange = async function() {
//   if(xhr.readyState == 4 && xhr.status == 200) {
//     let data1 = await JSON.parse(this.responseText).data1;
//     for (let i = 0; i < data1.length; i++) {
//       updateData(data1[i]);
//     }
//   }
// }

// xhr.open('GET', 'json/test.json', true);
// xhr.send();

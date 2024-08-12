let count = 1;
    let chart;

    const ctx = document.getElementById("energy-chart").getContext("2d");

    const bNext = document.querySelector('.head .bx-chevron-right');
    const bPrev = document.querySelector('.head .bx-chevron-left');
    const title = document.querySelector('.head p');


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
            case 'A':
                labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
                data = [65, 59, 80, 81, 56, 55, 40];
                break;
            case 'B':
                labels = ['August', 'September', 'October', 'November', 'December'];
                data = [28, 48, 40, 19, 86];
                break;
            case 'C':
                labels = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'];
                data = [12, 19, 3, 5, 2, 3];
                break;
            default:
                console.error('Invalid graph type');
                return;
        }

        createChart(labels, data, graphType);
    }

    function updateGraph(count) {
      switch (count) {
          case 1:
              updateGraphData('A');
              title.textContent = 'Monthly'
              break;
          case 2:
              updateGraphData('B');
              title.textContent = 'Daily'
              break;
          case 3:
              updateGraphData('C');
              title.textContent = 'Yearly'
              break;
          default:
              console.log('Invalid count');
      }
  }

  bNext.addEventListener('click', () => {
      count = (count % 3) + 1;
      updateGraph(count); // Update the graph with the new count
  });

  bPrev.addEventListener('click', () => {
      count = (count - 1) < 1 ? 3 : count - 1;
      updateGraph(count); // Update the graph with the new count
  });

  updateGraph(count); // Initialize with the first graph
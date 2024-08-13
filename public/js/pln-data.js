const cardData1 = document.getElementById("card1");
const cardData2 = document.getElementById("card2");
const cardData3 = document.getElementById("card3");
const total_today = document.querySelector(".total-today");
const total_monthly = document.querySelector(".total-monthly");
const cost = document.querySelector(".cost");
const socket = io();

socket.on("connect", () => {
  socket.on("vabdata", (message) => {
    // return console.log(iadata);
    if (cardData1.classList.contains("vabdata")) {
      cardData1.innerHTML = message;
    }
  });
  socket.on("vbcdata", (message) => {
    // return console.log(iadata);
    if (cardData2.classList.contains("vbcdata")) {
      cardData2.innerHTML = message;
    }
  });
  socket.on("vcadata", (message) => {
    // return console.log(iadata);
    if (cardData3.classList.contains("vcadata")) {
      cardData3.innerHTML = message;
    }
  });
  socket.on("vandata", (message) => {
    // return console.log(iadata);
    if (cardData1.classList.contains("vandata")) {
      cardData1.innerHTML = message;
    }
  });
  socket.on("vbndata", (message) => {
    // return console.log(iadata);
    if (cardData2.classList.contains("vbndata")) {
      cardData2.innerHTML = message;
    }
  });
  socket.on("vcndata", (message) => {
    // return console.log(iadata);
    if (cardData3.classList.contains("vcndata")) {
      cardData3.innerHTML = message;
    }
  });
  socket.on("data_daily", (message) => {
    // return console.log(iadata);
    total_today.innerHTML = message + " kWh";
  });
  socket.on("data_monthly", (message) => {
    // return console.log(iadata);
    total_monthly.innerHTML = message + " kWh";
  });
  socket.on("cost", (message) => {
    // return console.log(iadata);
    cost.innerHTML = message;
  });
});

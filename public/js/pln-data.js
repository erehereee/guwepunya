const socket = io();
const cardData1 = document.getElementById("card1");
const cardData2 = document.getElementById("card2");
const cardData3 = document.getElementById("card3");
const total_today = document.querySelector(".total-today");
const total_monthly = document.querySelector(".total-monthly");
const cost = document.querySelector(".cost");

socket.on("connect", () => {
  socket.on("dataCummon", (message) => {
    message.forEach((e) => {
      if (cardData1.classList.contains("vabdata")) {
        cardData1.textContent = e.vabdata;
        cardData2.textContent = e.vbcdata;
        cardData3.textContent = e.vcadata;
      } else {
        cardData1.textContent = e.vandata;
        cardData2.textContent = e.vbndata;
        cardData3.textContent = e.vcndata;
      }
    });
  });

  socket.on("dataBiogas", (message) => {
    message.forEach((e) => {
      // if (cardData1.classList.contains("vabdata")) {
      //   cardData1.textContent = e.vabdata;
      //   cardData2.textContent = e.vbcdata;
      //   cardData3.textContent = e.vcadata;
      // } else {
      //   cardData1.textContent = e.vandata;
      //   cardData2.textContent = e.vbndata;
      //   cardData3.textContent = e.vcndata;
      // }
      console.log(e);
    });
  });
  socket.on("dataToday", (message) => {
    message.forEach((e) => {
      const total_daily = e.data_daily / 1000;
      total_today.textContent = total_daily
        .toLocaleString("id-ID")
        .split(",")[0];
    });
  });
  socket.on("dataMonthly", (message) => {
    message.forEach((e) => {
      const data_monthly = e.sum / 1000;

      const tarif = 2.5;
      let dataTarif = data_monthly * tarif * 1000;

      let newAmount = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(dataTarif);

      total_monthly.textContent = data_monthly
        .toLocaleString("id-ID")
        .split(",")[0];
      cost.textContent = newAmount;
    });
  });
});

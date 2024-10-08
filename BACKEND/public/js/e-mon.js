const card1 = document.querySelector(".card1");
const card2 = document.querySelector(".card2");
const card3 = document.querySelector(".card3");

const data1 = document.getElementById("card1");
const data2 = document.getElementById("card2");
const data3 = document.getElementById("card3");
const buttonChange = document.querySelector(".btn-download");

buttonChange.addEventListener("click", function () {
  const isvabData = data1.classList.toggle("vandata");
  const isvbcData = data2.classList.toggle("vbndata");
  const isvcaData = data3.classList.toggle("vcndata");
  data1.classList.toggle("vabdata", !isvabData);
  data2.classList.toggle("vbcdata", !isvbcData);
  data3.classList.toggle("vcadata", !isvcaData);
  if (data1.classList.contains("vabdata")) {
    card1.textContent = "R Voltage";
    card2.textContent = "S Voltage";
    card3.textContent = "T Voltage";
  } else {
    card1.textContent = "R-N Voltage";
    card2.textContent = "S-N Voltage";
    card3.textContent = "T-N Voltage";
  }
});

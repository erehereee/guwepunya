const socket = io();

const ft101 = document.getElementById("tspan1998");
const ft102 = document.getElementById("tspan2000");
const ft201 = document.getElementById("tspan2002");
const ft301 = document.getElementById("tspan2004");
const ft401 = document.getElementById("tspan2006");
const ft402 = document.getElementById("tspan2008");
const ft601 = document.getElementById("tspan2010");
const ae201 = document.getElementById("tspan2012");
const ae202 = document.getElementById("tspan2014");
const ae301 = document.getElementById("tspan2016");
const ae401 = document.getElementById("tspan2018");
const ae402 = document.getElementById("tspan2020");
const ae501 = document.getElementById("tspan2026");
const ae601 = document.getElementById("tspan2024");
const pt401 = document.getElementById("tspan2028");
const pt901 = document.getElementById("tspan2030");
const pt902 = document.getElementById("tspan2032");
const pt201 = document.getElementById("tspan2034");
const le201 = document.getElementById("tspan2022");
console.log(document.querySelector("#tspan1994"));

socket.on("connect", () => {
  socket.on("dataBiogas", (message) => {
    message.forEach((e) => {
      ft101.textContent = e.ft_101 + " m³/h";
      ft102.textContent = e.ft_102 + " m³/h";
      ft201.textContent = e.ft_201 + " m³/h";
      ft301.textContent = e.ft_301 + " m³/h";
      ft401.textContent = e.ft_401 + " m³/h";
      ft402.textContent = e.ft_402 + " m³/h";
      ft601.textContent = e.ft_601 + " m³/h";
      ae201.textContent = e.ae_201 + " pH";
      ae202.textContent = e.ae_202 + " pH";
      ae301.textContent = e.ae_301 + " pH";
      ae401.textContent = e.ae_401 + " pH";
      ae402.textContent = e.ae_402 + " pH";
      ae501.textContent = e.ae_501 + " mg/l";
      ae601.textContent = e.ae_601 + " pH";
      pt201.textContent = e.pt_201 + " bar";
      pt401.textContent = e.pt_401 + " bar";
      pt901.textContent = e.pt_901 + " bar";
      pt902.textContent = e.pt_902 + " bar";
      le201.textContent = e.le_201 + " m";
    });
  });
});

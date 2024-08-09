const iadata = document.querySelector(".card-body.iadata");
const ibdata = document.querySelector(".card-body.ibdata");
const icdata = document.querySelector(".card-body.icdata");
const vadata = document.querySelector(".card-body.vadata");
const vbdata = document.querySelector(".card-body.vbdata");
const vcdata = document.querySelector(".card-body.vcdata");
const socket = io();

socket.on("connect", () => {
  socket.on("iadata", (message) => {
    // return console.log(iadata);
    iadata.innerHTML = message;
  });
  socket.on("ibdata", (message) => {
    // return console.log(iadata);
    ibdata.innerHTML = message;
  });
  socket.on("icdata", (message) => {
    // return console.log(iadata);
    icdata.innerHTML = message;
  });
  socket.on("vabdata", (message) => {
    // return console.log(iadata);
    vadata.innerHTML = message;
  });
  socket.on("vbcdata", (message) => {
    // return console.log(iadata);
    vbdata.innerHTML = message;
  });
  socket.on("vcadata", (message) => {
    // return console.log(iadata);
    vcdata.innerHTML = message;
  });
});

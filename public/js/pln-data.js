const iadata = document.querySelector(".card-body.iadata");
const ibdata = document.querySelector(".card-body.ibdata");
const icdata = document.querySelector(".card-body.icdata");
const vabdata = document.querySelector(".card-body.vabdata");
const vbcdata = document.querySelector(".card-body.vbcdata");
const vcadata = document.querySelector(".card-body.vcadata");
const vandata = document.querySelector(".card-body.vandata");
const vbndata = document.querySelector(".card-body.vbndata");
const vcndata = document.querySelector(".card-body.vcndata");
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
    vabdata.innerHTML = message;
  });
  socket.on("vbcdata", (message) => {
    // return console.log(iadata);
    vbcdata.innerHTML = message;
  });
  socket.on("vcadata", (message) => {
    // return console.log(iadata);
    vcadata.innerHTML = message;
  });
  socket.on("vandata", (message) => {
    // return console.log(iadata);
    vandata.innerHTML = message;
  });
  socket.on("vbndata", (message) => {
    // return console.log(iadata);
    vbndata.innerHTML = message;
  });
  socket.on("vcndata", (message) => {
    // return console.log(iadata);
    vcndata.innerHTML = message;
  });
});

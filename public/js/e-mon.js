const buttonClassLN = document.querySelector(
  ".container .main-content .main-dashboard .top .gauge-1phase"
);
const buttonClassLL = document.querySelector(
  ".container .main-content .main-dashboard .top .gauge-3phase"
);
const titleText = document.querySelector(
  ".container .main-content .main-dashboard .top .selector .title h3"
);
const testGet1 = buttonClassLN.getAttribute("class");

phaseButton.addEventListener("click", function () {
  buttonClassLN.classList.toggle("hide");
  buttonClassLL.classList.toggle("hide");
  if (testGet1 == "gauge-1phase hide") {
    titleText.innerHTML = "Voltage/Current 1 Phase";
  } else {
    titleText.innerHTML = "Voltage/Current 3 Phase";
  }
});

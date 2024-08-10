const buttonClassLN = document.querySelector(
  ".container .main-content .main-dashboard .top .gauge-1phase"
);
const buttonClassLL = document.querySelector(
  ".container .main-content .main-dashboard .top .gauge-3phase"
);
const titleText = document.querySelector(".title h3");

phaseButton.addEventListener("click", function () {
  buttonClassLN.classList.toggle("hide");
  buttonClassLL.classList.toggle("hide");
  if (buttonClassLL.classList.contains("hide")) {
    titleText.textContent = "Voltage/Current 1 Phase";
  } else {
    titleText.textContent = "Voltage/Current 3 Phase";
  }
});

const allSideMenu = document.querySelectorAll("#sidebar .side-menu.top li a");

allSideMenu.forEach((item) => {
  const li = item.parentElement;

  item.addEventListener("click", function () {
    allSideMenu.forEach((i) => {
      i.parentElement.classList.remove("active");
    });
    li.classList.add("active");
  });
});

// TOGGLE SIDEBAR
const menuBar = document.querySelector("#content nav .bx.bx-menu");
const sidebar = document.getElementById("sidebar");

menuBar.addEventListener("click", function () {
  sidebar.classList.toggle("hide");
});

const searchButton = document.querySelector(
  "#content nav form .form-input button"
);
const searchButtonIcon = document.querySelector(
  "#content nav form .form-input button .bx"
);
const searchForm = document.querySelector("#content nav form");

const switchMode = document.getElementById("switch-mode");

document.querySelector(".logout").addEventListener("click", async function () {
  try {
    const response = await fetch("user/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const data = await response.json();
      window.location.href = "/login";
    } else {
      console.error("Logout failed:", await response.text());
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }
});

switchMode.addEventListener("change", function () {
  if (this.checked) {
    document.body.classList.add("dark");
    chart.options.scales.x.grid.color = "white";
    chart.options.scales.y.grid.color = "white";
    chart.options.scales.x.ticks.color = "white";
    chart.options.scales.y.ticks.color = "white";
    chart.update();
  } else {
    document.body.classList.remove("dark");
    chart.options.scales.x.grid.color = "black";
    chart.options.scales.y.grid.color = "black";
    chart.options.scales.x.ticks.color = "black";
    chart.options.scales.y.ticks.color = "black";
    chart.update();
  }
});

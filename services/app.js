const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const cors = require("cors");
const path = require("path");
const { sessionDB } = require("../helper/helperdb");
const { isAuth } = require("../controller/Auth");
const router = require("../router/router");

const app = express();

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(
  "/css",
  express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css"))
);
app.use(express.urlencoded({ extended: false }));

app.use(cors());
app.use(express.json());
app.use(sessionDB);

app.use("/user", router);

app.get("/login", (req, res) => {
  res.render("login", {
    title: "Login",
  });
});

app.use(expressLayouts);
app.set("layout extractScripts", true);

app.get("/", isAuth, (req, res) => {
  res.render("index", {
    layout: "layouts/main-layout",
    title: "Dashboard",
    username: req.session.user,
  });
});

app.get("/pm", isAuth, (req, res) => {
  res.render("plant", {
    layout: "layouts/main-layout",
    title: "Power Monitoring",
    username: req.session.user,
  });
});

app.get("/pln", isAuth, (req, res) => {
  res.render("energy-pln", {
    layout: "layouts/main-layout",
    title: "EMon PLN",
    username: req.session.user,
  });
});

app.get("/genset", isAuth, (req, res) => {
  res.render("energy-genset", {
    layout: "layouts/main-layout",
    title: "EMon Genset",
    username: req.session.user,
  });
});

app.get("/report", isAuth, (req, res) => {
  res.render("report", {
    layout: "layouts/main-layout",
    title: "Report",
    username: req.session.user,
  });
});

app.use((req, res) => {
  res.redirect("/");
});

module.exports = app;

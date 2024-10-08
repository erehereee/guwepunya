/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import SideBar from "../component/sidebar/sideBar";
import NavBar from "../component/navbar/navBar";
import Plant from "../component/pageLayout/mainPlant";
import Dashboard from "../component/pageLayout/mainDashboard";
import Energy from "../component/pageLayout/mainEnergy";
import Power from "../component/pageLayout/mainPower";
import Report from "../component/pageLayout/mainReport";
function Main() {
  const [test, setTest] = useState("");
  const [toggle, setToggle] = useState("");
  const handleToggleMenu = () => {
    toggle == !"hide" ? setToggle("hide") : setToggle("");
  };
  const handleMenuClick = (title) => {
    setTest(title);
  };
  const content = () => {
    switch (test) {
      case "Dashboard":
        return <Dashboard />;
      case "Plant Monitoring":
        return <Plant />;
      case "Energy Monitoring":
        return <Energy />;
      case "Power Monitoring":
        return <Power />;
      case "Report":
        return <Report />;
      default:
        return <div>Hello</div>;
    }
  };

  return (
    <>
      <SideBar
        functionClick={handleMenuClick}
        itemActive={test}
        toggle={toggle}
      />
      <section id="content">
        <NavBar username="Operator" func={handleToggleMenu} />
        <main>{content()}</main>
      </section>
    </>
  );
}

export default Main;

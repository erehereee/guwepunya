/* eslint-disable react/prop-types */
import SideBar from "../fragment/sideBar";
import NavBar from "../fragment/navBar";
import { useState } from "react";
function Main(props) {
  const { children, func } = props;
  const [state, setState] = useState("");
  const sideBarToggle = () => {
    if (state === "hide") {
      setState("");
    } else {
      setState("hide");
    }
  };
  return (
    <>
      <SideBar onClick={func} hide={state} />
      <section id="content">
        <NavBar username="Operator" func={sideBarToggle} />
        <main>{children}</main>
      </section>
    </>
  );
}

export default Main;

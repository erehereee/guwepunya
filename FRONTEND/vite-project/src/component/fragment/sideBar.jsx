/* eslint-disable react/prop-types */
import Menu from "../element/menu";

function SideBar(props) {
  const { hide, onClick } = props;
  return (
    <section id="sidebar" className={hide}>
      <Menu
        url="#"
        title="Plant Monitoring"
        icon="bx bx-code-alt"
        state="brand"
        func={onClick}
      />
      <ul className="side-menu top">
        <Menu
          url="#"
          title="Dashboard"
          icon="bx bxs-dashboard"
          ctitle="text"
          func={onClick}
        />
        <Menu
          url="#"
          title="Plant Monitoring"
          icon="bx bxs-factory"
          ctitle="text"
          func={onClick}
        />
        <Menu
          url="#"
          title="Energy Monitoring"
          icon="bx bx-bolt-circle"
          ctitle="text"
          func={onClick}
        />
        <Menu
          url="#"
          title="Power Monitoring"
          icon="bx bx-bolt-circle"
          ctitle="text"
          func={onClick}
        />
        <Menu
          url="#"
          title="Report"
          icon="bx bx-bar-chart-square"
          ctitle="text"
          func={onClick}
        />
      </ul>
      <ul className="side-menu">
        <Menu
          url="#"
          title="Logout"
          icon="bx bx-log-out"
          state="logout"
          ctitle="text"
          func={onClick}
        />
      </ul>
    </section>
  );
}

export default SideBar;

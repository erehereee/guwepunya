/* eslint-disable react/prop-types */
import Menu from "../element/menu";

function SideBar({ functionClick, itemActive, toggle }) {
  const data = [
    { title: "Dashboard", icon: "bx bxs-dashboard" },
    { title: "Plant Monitoring", icon: "bx bxs-factory" },
    { title: "Energy Monitoring", icon: "bx bx-bolt-circle" },
    { title: "Power Monitoring", icon: "bx bx-bolt-circle" },
    { title: "Report", icon: "bx bx-bar-chart-square" },
  ];
  return (
    <section id="sidebar" className={toggle}>
      <Menu url="#" title="UMSI" icon="bx bx-code-alt" state="brand" />
      <ul className="side-menu top">
        {data.map((e, i) => {
          return (
            <Menu
              key={i}
              title={e.title}
              icon={e.icon}
              ctitle="text"
              func={() => functionClick(e.title)}
              active={itemActive === e.title ? "active" : ""}
            />
          );
        })}
      </ul>
      <ul className="side-menu">
        <Menu
          url="#"
          title="Logout"
          icon="bx bx-log-out"
          state="logout"
          ctitle="text"
        />
      </ul>
    </section>
  );
}

export default SideBar;

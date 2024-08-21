/* eslint-disable react/prop-types */
import NavIcon from "../element/navIcon";

function NavBar(props) {
  const { username, func } = props;
  return (
    <nav>
      <div className="menu" onClick={func}>
        <i className="bx bx-menu"></i>
      </div>
      <div className="head-nav">
        <input type="checkbox" id="switch-mode" hidden />
        <label htmlFor="switch-mode" className="switch-mode"></label>
        <NavIcon
          url="#"
          title="8"
          icon="bx bxs-bell"
          state="notification"
          ctitle="num"
        />
      </div>
      <div className="head-user">
        <NavIcon
          url="#"
          title={username}
          icon="bx bxs-user-circle"
          state="profile"
        />
      </div>
    </nav>
  );
}

export default NavBar;

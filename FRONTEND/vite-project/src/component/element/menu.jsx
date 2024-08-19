/* eslint-disable react/prop-types */
function Menu(props) {
  const { state, url, title, icon, ctitle, active, func } = props;
  console.log(`Rendering sidebar menu : ${title}`);
  return (
    <li className={active} onClick={func}>
      <a href={url} className={state}>
        <i className={icon}></i>
        <span className={ctitle}>{title}</span>
      </a>
    </li>
  );
}

export default Menu;

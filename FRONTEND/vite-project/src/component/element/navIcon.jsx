/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
function NavIcon(props) {
  const { state, url, title, icon, ctitle } = props;
  return (
    <a href={url} className={state}>
      <i className={icon}></i>
      <span className={ctitle}>{title}</span>
    </a>
  );
}

export default NavIcon;

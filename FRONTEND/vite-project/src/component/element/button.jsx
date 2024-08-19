/* eslint-disable react/prop-types */
function Button(props) {
  const { url, state, ctitle, title } = props;
  return (
    <a href={url} className={state}>
      <span className={ctitle}>{title}</span>
    </a>
  );
}

export default Button;

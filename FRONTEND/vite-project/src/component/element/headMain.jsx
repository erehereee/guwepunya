/* eslint-disable react/prop-types */
function HeadMain(props) {
  const { title } = props;
  return (
    <div className="head-title">
      <div className="left">
        <h1>{title}</h1>
        <ul className="breadcrumb">
          <li>
            <a href="#">{title}</a>
          </li>
          <li>
            <i className="bx bx-chevron-right"></i>
          </li>
          <li>
            <a className="active" href="#">
              Home
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default HeadMain;

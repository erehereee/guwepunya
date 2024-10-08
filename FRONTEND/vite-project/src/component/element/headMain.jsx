/* eslint-disable react/prop-types */
function HeadMain(props) {
  const { title } = props;
  return (
    <div className="head-title">
      <div className="left">
        <h1>{title}</h1>
      </div>
    </div>
  );
}

export default HeadMain;

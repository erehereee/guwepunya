import HeadMain from "../element/headMain";
import Button from "../element/button";
function MainPower() {
  const dataButton = [
    { title: "LVMDP1", state: "btn-navigation" },
    { title: "LVMDP2", state: "btn-navigation" },
    { title: "LVMDP3", state: "btn-navigation" },
    { title: "LVMDP4", state: "btn-navigation" },
    { title: "LVMDP5", state: "btn-navigation" },
  ];
  return (
    <>
      <HeadMain title="Power Monitoring" />
      <div className="head-main">
        <div className="navigator">
          {dataButton.map((e, i) => {
            return (
              <Button key={i} title={e.title} ctitle="text" state={e.state} />
            );
          })}
        </div>
      </div>
      <LVMDP1 />
      {/* <div className="body-container">
        .card
      </div> */}
    </>
  );
}

const LVMDP1 = () => {
  return (
    <div className="table-data">
      <div className="order">
        <div className="head">
          <h3>Realtime Trend</h3>
          <p>Monthly</p>
          <i className="bx bx-chevron-left"></i>
          <i className="bx bx-chevron-right"></i>
        </div>
        <canvas id="energy-chart"></canvas>
      </div>
      <div className="todo">
        <div className="head">
          <h3>Information</h3>
        </div>
        <ul className="todo-list">
          <li className="completed">
            <p>
              <strong>Average Current L-L</strong>
            </p>
            <p className="iavgLL">null</p>
          </li>
          <li className="completed">
            <p>
              <strong>Average Current L-N</strong>
            </p>
            <p className="iavgLN">null</p>
          </li>
          <li className="completed">
            <p>
              <strong>Cos φ</strong>
            </p>
            <p className="cos">null</p>
          </li>
          <li className="completed">
            <p>
              <strong>Average Voltage L-L</strong>
            </p>
            <p className="vavgLL">null</p>
          </li>
          <li className="completed">
            <p>
              <strong>Average Voltage L-N</strong>
            </p>
            <p className="vavgLN">null</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MainPower;

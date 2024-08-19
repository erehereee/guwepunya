import Button from "../element/button";
import HeadMain from "../element/headMain";

function MainEnergy() {
  return (
    <>
      <HeadMain title="Energy Monitoring" />

      <div className="head-main">
        <div className="box-head">
          <h3>Power Information</h3>
          <Button
            url="#"
            title="Change Data"
            ctitle="text"
            state="btn-download"
          />
        </div>
        <div className="box-body">
          <div>
            <i className="bx bxs-bolt"></i>
            <span className="text">
              <h3 id="card1" className="vabdata">
                null
              </h3>
              <p className="card1">R Voltage</p>
            </span>
          </div>
          <div>
            <i className="bx bxs-bolt"></i>
            <span className="text">
              <h3 id="card2" className="vbcdata">
                null
              </h3>
              <p className="card2">S Voltage</p>
            </span>
          </div>
          <div>
            <i className="bx bxs-bolt"></i>
            <span className="text">
              <h3 id="card3" className="vcadata">
                null
              </h3>
              <p className="card3">T Voltage</p>
            </span>
          </div>
        </div>
      </div>
      <div className="table-data">
        <div className="order">
          <div className="head">
            <h3>Graph Analytic</h3>
            <p>Monthly</p>
            <i className="bx bx-chevron-left"></i>
            <i className="bx bx-chevron-right"></i>
          </div>
          <canvas id="energy-chart"></canvas>
        </div>
        <div className="todo">
          <div className="head">
            <h3>Energy Usage</h3>
          </div>
          <ul className="todo-list">
            <li className="completed">
              <p>
                <strong>WBP</strong>
              </p>
              <p className="wbp">null</p>
            </li>
            <li className="completed">
              <p>
                <strong>LWBP</strong>
              </p>
              <p className="lwbp">null</p>
            </li>
            <li className="completed">
              <p>
                <strong>Cost this month</strong>
              </p>
              <p className="cost">null</p>
            </li>
            <li className="completed">
              <p>
                <strong>Total today</strong>
              </p>
              <p className="total-today">null</p>
            </li>
            <li className="completed">
              <p>
                <strong>Total this month</strong>
              </p>
              <p className="total-monthly">null</p>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default MainEnergy;

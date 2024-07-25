import React from "react";
import Frontbase from "./../../layouts/frontbase/Frontbase";
import "./homepage.scss";

const Homepage = () => {
  return (
    <Frontbase>
      <div className="homepage-content">
        <div className="widget-container">
          <div className="widget">
            <div className="widget-title">Toplam Proje:</div>
            <div className="widget-value">15</div>
            <button className="widget-button">İncele</button>
          </div>
          <div className="widget">
            <div className="widget-title">Aylık Maliyet:</div>
            <div className="widget-value">45500₺</div>
            <button className="widget-button">İncele</button>
          </div>
          <div className="widget">
            <div className="widget-title">Aylık Ödeme:</div>
            <div className="widget-value">515000₺</div>
            <button className="widget-button">İncele</button>
          </div>
          <div className="widget">
            <div className="widget-title">Tahmini Kazanç:</div>
            <div className="widget-value">15500₺</div>
            <button className="widget-button">İncele</button>
          </div>
        </div>
        <div className="chart-container">
          <div className="chart-card">Chart 1</div>
          <div className="chart-card">Chart 2</div>
        </div>
      </div>
    </Frontbase>
  );
};

export default Homepage;

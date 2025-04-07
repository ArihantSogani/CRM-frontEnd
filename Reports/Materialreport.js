import React, { useEffect, useState } from "react";
import style from "./Reports.module.css";
import SearchInput from "./Components/SearchInput/SearchInput";
import PieChart from "./Components/PieChart";
import LineChart from "./Components/LineChart";
import { useCookies } from "react-cookie";
import api from "../../http/api";
import _ from "loadsh";
import sumOfData from "../../constants/sumOfData";

const MaterialReport = () => {
  const [pieChartData, setPieChartData] = useState([]);
  const [lineChartData, setLineChartData] = useState([]);
  const [orders, setOrders] = useState([]);
  const [cookie] = useCookies();

  useEffect(() => {
    (async () => {
      try {
        const data = await api.get(`/api/v1/order?sort=null`, {
          headers: {
            Authorization: `Bearer ${cookie.session.token}`,
          },
        });
        setOrders(
          _.get(data, "data.data.orders", []).filter(
            (data) => data.isCompleted && data
          )
        );
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <>
      <div className={style.stocklowerBody}>
        <div className={style.topmost}>
          <SearchInput />
          <div className={style.range}>
            <button type="button">1D</button>
            <button type="button">1W</button>
            <button type="button">1M</button>
            <button type="button">1Y</button>
            <button type="button">All</button>
          </div>
        </div>
        <div className={style.reportInfo}>
          <div className={style.infoContent}>
            <h1>{sumOfData(orders, "weightInput.$numberDecimal")}</h1>
            <p>Net Material Input (gms)</p>
          </div>
          <div className={style.infoContent}>
            <h1>
              {(
                sumOfData(orders, "weightInput.$numberDecimal") * 1 -
                1 * sumOfData(orders, "wastage.$numberDecimal")
              ).toFixed(2)}
            </h1>
            <p>Net Material used</p>
          </div>
          <div className={style.infoContent}>
            <h1>{sumOfData(orders, "wastage.$numberDecimal")}</h1>
            <p>Net Material wastage (gms)</p>
          </div>
        </div>
        <div className={style.chart}>
          <div className={style.pieChart}>
            <h3>Pie Chart</h3>
            <PieChart />
          </div>
          <div className={style.lineChart}>
            <h3>Line Chart</h3>
            <LineChart />
          </div>
        </div>
      </div>
    </>
  );
};

export default MaterialReport;

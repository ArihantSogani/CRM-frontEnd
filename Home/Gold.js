import React from 'react';
import style from "./Home.module.css";
import LineChart from "./Components/LineChart";

const Gold = () => {
    return (
        <div className={style.card}>
            <div className={style.titleInfo}>
                <h2>Gold</h2>
                <div className={style.option}>
                    <button className="button">14k</button>
                    <button className="button">18k</button>
                    <button className="button">22k</button>
                </div>
            </div>
            <div className={style.info}>
                <p>10g of gold(99.9%) is</p>
                <h2>49,615.00 Indian Rupee</h2>
                <p>3 Feb, 4:09 pm IST</p>
            </div>
            <div className={style.graphStyle}>
                <div className={style.graphContent}>
                    <h4>Prices</h4>
                    <p>&#8593; 7,00%</p>
                </div>
                <div className={style.range}>
                    <button type="button">1D</button>
                    <button type="button">1W</button>
                    <button type="button">1M</button>
                    <button type="button">1Y</button>
                    <button type="button">Max</button>
                </div>
                <div className={style.chart}>
                    <LineChart />
                </div>
            </div>
        </div>
    )
}
export default Gold;
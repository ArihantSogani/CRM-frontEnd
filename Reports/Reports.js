import React from "react";
import PersonalComponent from "../../sharedComponents/PersonalComponent/PersonalComponent";
import style from "./Reports.module.css";
import { Link } from "react-router-dom";
import MaterialReport from "./Materialreport";

const Report = () => {
  return (
    <>
      <div
        style={{
          paddingLeft: "180px",
        }}
      >
        <div className={style.upperContainer}>
          <PersonalComponent />
        </div>
        <div className={style.lowerBody}>
          <ul>
            <li>
              <Link to="/reports" className={`${style.currlink}`}>
                <div className={style.LiItem}>Material Report</div>
              </Link>
            </li>
            <li>
              <Link to="/reports/report" className={`${style.currlink}`}>
                <div
                  className={style.LiItem}
                  style={{
                    color: "grey",
                    border: "none",
                  }}
                >
                  Order Report
                </div>
              </Link>
            </li>
          </ul>
          <MaterialReport />
        </div>
      </div>
    </>
  );
};

export default Report;

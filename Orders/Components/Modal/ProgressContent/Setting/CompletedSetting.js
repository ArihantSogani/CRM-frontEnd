import { get } from "lodash";
import React from "react";
import { useSelector } from "react-redux";
import dateConverter from "../../../../../../constants/convertDate";
import dateDiff from "../../../../../../constants/dateDiff";

const CompletedSetting = (props) => {
  const { style } = props;
  let { data } = useSelector((state) => state.order);
  data = get(data, "setting");

  return (
    <div className={style.completedContainer}>
      <div className={style.gridContent}>
        <b>Weight In:</b>{" "}
        <span>{get(data, "weightInput.$numberDecimal")} gm</span>
      </div>
      <div className={style.gridContent}>
        <b>Time In:</b> <span>{dateConverter(get(data, "createdAt"))}</span>
      </div>
      <div className={style.gridContent}>
        <b>Weight Out:</b>{" "}
        <span>{get(data, "weightOutput.$numberDecimal")} gm</span>
      </div>
      <div className={style.gridContent}>
        <b>Time Out:</b>{" "}
        <span>{dateConverter(get(data, "timestampOutput"))}</span>
      </div>
      <div className={style.gridContent}>
        <b>Stone Weight:</b>{" "}
        <span>{get(data, "stoneWeightInput.$numberDecimal")} gm</span>
      </div>
      <div className={style.gridContent}>
        <b>Weight of Finding:</b>{" "}
        <span>{get(data, "weightOfFinding.$numberDecimal")} gm</span>
      </div>
      <div className={style.gridContent}>
        <b>Process Wastage:</b>{" "}
        <span>
          {(
            get(data, "weightInput.$numberDecimal") * 1 +
            get(data, "stoneWeightInput.$numberDecimal", 0) * 1 +
            get(data, "weightOfFinding.$numberDecimal", 0) * 1 -
            get(data, "weightOutput.$numberDecimal")
          ).toFixed(2)}{" "}
          gm
        </span>
      </div>
      <div className={style.gridContent}>
        <b>Total Time:</b>{" "}
        <span>
          {dateDiff(get(data, "timestampOutput"), get(data, "createdAt"))}
        </span>
      </div>
      <div className={style.gridContent}>
        <b>Comment:</b> <span>{get(data, "comment")}</span>
      </div>
    </div>
  );
};

export default CompletedSetting;

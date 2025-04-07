import React from "react";
import { get } from "loadsh";
import dateConverter from "../../../../../../constants/convertDate";
import dateDiff from "../../../../../../constants/dateDiff";
import { useSelector } from "react-redux";

const ProcessContent = (props) => {
  const { process, style, height } = props;
  const { data } = useSelector((state) => state.order);

  return (
    <div className={style.contentBlock} style={{ height: height, padding: 0 }}>
      <div className={style.contentPair}>
        <b>Process Start Date:</b>
        <b>:</b>
        <p>{dateConverter(get(process, "createdAt"))}</p>
      </div>
      <div className={style.contentPair}>
        <b>Process Completion Date</b>
        <b>:</b>
        <p>{dateConverter(get(process, "timestampOutput"))}</p>
      </div>
      <div className={style.contentPair}>
        <b>Process Total Time</b>
        <b>:</b>
        <p>
          {dateDiff(get(process, "timestampOutput"), get(process, "createdAt"))}
        </p>
      </div>
      <div className={style.contentPair}>
        <b>Weight Input</b>
        <b>:</b>
        <p>{get(process, "weightInput.$numberDecimal")}</p>gm
      </div>
      <div className={style.contentPair}>
        <b>Weight Output</b>
        <b>:</b>
        <p>{get(process, "weightOutput.$numberDecimal", "NaN")}</p> gm
      </div>
      <div className={style.contentPair}>
        <b>Process Wastage</b>
        <b>:</b>
        <p>{get(process, "wastage.$numberDecimal", "NaN")}</p> gm
      </div>
      {get(process, "stoneWeightInput.$numberDecimal") && (
        <div className={style.contentPair}>
          <b>Stone Input Weight</b>
          <b>:</b>
          <p>{get(process, "stoneWeightInput.$numberDecimal", "NaN")}</p> gm
        </div>
      )}
      {get(process, "weightOfFinding.$numberDecimal") && (
        <div className={style.contentPair}>
          <b>Weight of Finding</b>
          <b>:</b>
          <p>{get(process, "weightOfFinding.$numberDecimal", "NaN")}</p> gm
        </div>
      )}
      {get(process, "stoneWeightOutput.$numberDecimal") && (
        <div className={style.contentPair}>
          <b>Stone Output Weight</b>
          <b>:</b>
          <p>{get(process, "stoneWeightOutput.$numberDecimal", "NaN")}</p> gm
        </div>
      )}
      {get(process, "stoneWastage.$numberDecimal") && (
        <div className={style.contentPair}>
          <b>Stone Wastage</b>
          <b>:</b>
          <p>
            {(get(process, "stoneWastage.$numberDecimal", "NaN") * 1).toFixed(
              2
            )}
          </p>{" "}
          gm
        </div>
      )}
      <div className={style.contentPair}>
        <b>Net Wastage</b>
        <b>:</b>
        <p>
          {(
            get(data, "weightInput.$numberDecimal") -
            get(process, "weightOutput.$numberDecimal")
          ).toFixed(2)}
        </p>{" "}
        gm
      </div>
      <div className={style.contentPair}>
        <b>Comment</b>
        <p>{get(process, "comment")}</p>
      </div>
    </div>
  );
};

export default ProcessContent;

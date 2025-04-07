import React from "react";
import style from "./Box.module.css";
import { get } from "loadsh";
import { useDispatch } from "react-redux";
import { setStockData } from "../../../store/stocksSlice";

const BoxGold = (props) => {
  const dispatch = useDispatch();
  const { data } = props;

  const onClick = () => {
    props.handleOpen();
    dispatch(setStockData({
      stockData: data
    }))
  };

  return (
    <div className={style.box}>
      <div onClick={onClick}>
        <div className={style.line}>
          <div className={style.name}>
            <p>{get(data, "name")} </p>
          </div>
          <div className={style.name}>
            <p>{get(data, "carat")}</p>
          </div>
        </div>
        <div className={style.line}>
          <div className={style.weight}>
            <h2>{get(data, "weight", 0)} gm</h2>
          </div>
          <div className={style.name}>
            <p>Weight</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoxGold;

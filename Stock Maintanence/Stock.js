import React, { useEffect, useState } from "react";
import style from "./Stock.module.css";
import PersonalComponent from "../../sharedComponents/PersonalComponent/PersonalComponent";
import CurrStock from "./CurrStock";
import { Link, useLocation } from "react-router-dom";
import Modal_stock from "./Component/Modal/Modal_stock";
import StockArrival from "./StockArrival";

const Stock = () => {
  const [openStock, setOpenStock] = useState(false);
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [stocksData, setStocksData] = useState([]);
  const [selectedOption, setSelectedOption] = useState("currentStock");

  useEffect(() => {
    // setStocksData([
    //   {
    //   }
    // ])
  }, []);

  const handleChange = () => {
    setOpenStock(!openStock);
  };

  return (
    <>
      {openStock ? (
        <Modal_stock open={openStock} handleClose={handleChange} />
      ) : null}
      <div
        style={{
          paddingLeft: "180px",
        }}
      >
        <div className={style.upperContainer}>
          <PersonalComponent />
        </div>
        <div className={style.stocklowerBody}>
          <ul>
            <li
              className={style.currlink}
              onClick={() => {
                setSelectedOption("currentStock");
              }}
            >
              <div
                className={style.LiItem}
                style={{
                  color: `${
                    selectedOption === "currentStock" ? "#02374e" : "grey"
                  }`,
                  borderBottom: `${
                    !(selectedOption === "currentStock")
                      ? "none"
                      : "2px solid #02374e"
                  }`,
                  transition: "200ms ease",
                }}
              >
                Current Stock
              </div>
            </li>
            <li
              className={style.currlink}
              onClick={() => setSelectedOption("stockArrival")}
            >
              <div
                className={style.LiItem}
                style={{
                  color: `${
                    selectedOption === "stockArrival" ? "#02374e" : "grey"
                  }`,
                  borderBottom: `${
                    selectedOption === "stockArrival"
                      ? "2px solid #02374e"
                      : "none"
                  }`,
                  transition: "200ms ease",
                }}
              >
                Stock Arrival
              </div>
            </li>
          </ul>
          {selectedOption === "currentStock" ? (
            <CurrStock handleOpen={handleChange} />
          ) : (
            <StockArrival />
          )}
        </div>
      </div>
    </>
  );
};

export default Stock;

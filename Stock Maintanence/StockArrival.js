import React, { useEffect, useState } from "react";
import style from "./Stock.module.css";
import { get } from "loadsh";
import PersonalComponent from "../../sharedComponents/PersonalComponent/PersonalComponent";
import SearchInput from "../Orders/Components/SearchInput/SearchInput";
import { Link, useLocation } from "react-router-dom";
import StockTable from "./Component/StockTable";
import Button from "../../sharedComponents/Button/Button";
import { AiOutlinePlusCircle } from "react-icons/ai";

const StockArrival = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stockId, setstockId] = useState(null);
  const [openStock, setOpenStock] = useState(false);

  /* const handleUpdate = (data) => {
      setstockId(get(data, "_id"));
      setOpen(true);
  }; */

  return (
    <>
      <div
        className={style.card}
        style={{
          marginBottom: "14px",
        }}
      >
        <div className={style.content}>
          <SearchInput />
          <Button>
            <AiOutlinePlusCircle size={18} className={style.Icon} />
            Add New Stock
          </Button>
        </div>
      </div>
      <div className={style.card}>
        <StockTable stocks={stocks} loading={loading} />
      </div>
    </>
  );
};

export default StockArrival;

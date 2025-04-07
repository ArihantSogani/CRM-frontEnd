/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import SearchInputstock from "./Component/SearchInput.js";
import style from "./Stock.module.css";
import BoxGold from "./Component/Box-gold";
import BoxShell from "./Component/Box-shell";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentOrders } from "../../store/stocksSlice.js";
import api from "../../http/api.js";
import { useCookies } from "react-cookie";
import { get } from "loadsh";
import { notification, Select } from "antd";
import { useState } from "react";
import StockTable from "./Component/StockTable/StockTable";
import EditModal from "./Component/EditModal/EditModal.js";
import { count100 } from "../../constants/count100.js";

const { Option } = Select;

const CurrStock = (props) => {
  const [cookie] = useCookies();
  const inputOptions = [
    { label: "Gem Stones", data: "gemstone" },
    { label: "Design Codes", data: "designcode" },
  ];
  const [currentData, setCurrentData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [editModalData, setEditModalData] = useState(null);
  const [updateData, setUpdateData] = useState(false);
  const [page, setPage] = useState(10);

  const [selectedInput, setSelectedInput] = useState("gemstone");

  const handleEdit = async (data) => {
    setEditModalData(data);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setUpdateData(!updateData);
  };

  const handleDelete = async (data) => {
    setLoading(true);
    try {
      await api.delete(`/api/v1/storage/jewelry/gemstone/${get(data, "_id")}`, {
        headers: {
          Authorization: `Bearer ${cookie.session.token}`,
        },
      });
      notification.success({
        message: `${get(data, "name")} is successfully deleted.`,
      });
    } catch (err) {
      console.log(err);
      notification.warn({
        message: get(err, "response.data.message", "Error"),
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    (async () => {
      try {
        const data = await await api.get(
          `/api/v1/storage/jewelry/${selectedInput}`,
          {
            headers: {
              Authorization: `Bearer ${cookie.session.token}`,
            },
          }
        );
        setCurrentData(get(data, "data.data.storageData"));
      } catch (err) {
        console.log(err);
      }
    })();
  }, [selectedInput, loading, updateData]);

  return (
    <>
      <EditModal
        visible={open}
        modalData={editModalData}
        handleClose={handleClose}
      />
      <div className={style.stocklowerBody}>
        <div className={`${style.card} ${style.flowBox}`}>
          <SearchInputstock />
          <div className={style.sortInput}>
            Get data of:
            <Select
              className={style.select}
              value={selectedInput}
              onChange={(e) => setSelectedInput(e)}
            >
              {inputOptions.map((data) => {
                return <Option value={data.data}>{data.label}</Option>;
              })}
            </Select>
          </div>
          <div className={style.sortInput}>
            Select Number of items to be displayed:
            <Select
              className={style.select}
              value={page}
              onChange={(e) => setPage(e)}
              style={{ width: "64px" }}
            >
              {count100().map((data) => {
                return <Option value={data}>{data}</Option>;
              })}
            </Select>
          </div>
        </div>
        <div className={style.card} style={{ marginTop: "16px" }}>
          <StockTable
            handleDelete={handleDelete}
            selectedInput={selectedInput}
            currentData={currentData}
            page={page}
            loading={loading}
            handleEdit={handleEdit}
          />
        </div>
      </div>
    </>
  );
};

export default CurrStock;

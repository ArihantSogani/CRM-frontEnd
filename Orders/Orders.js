/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import api from "../../http/api";
import PersonalComponent from "../../sharedComponents/PersonalComponent/PersonalComponent";
import style from "./Orders.module.css";
import _, { get } from "loadsh";
import { notification, Select, DatePicker } from "antd";
import options from "./constants/option";
import moment from "moment";
import Modal from "./Components/Modal/Modal";
import SearchInput from "./Components/SearchInput/SearchInput";
import OrderTable from "./Components/OrderTable/OrderTable";
import dateConverter from "../../constants/convertDate";
import UpdateModal from "./Components/UpdateModal/UpdateModal";
import { AiOutlineCloudDownload } from "react-icons/ai";
import { CSVLink } from "react-csv";
import headers from "./constants/headers";
import camelCaseToWord from "../../constants/camelCasetoWord";
import { count100 } from "../../constants/count100";
import dateFilter from "../../constants/dateFilter";
import { getDate } from "../../constants/getDate";
import { useSelector } from "react-redux";

const { RangePicker } = DatePicker;

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [cookie] = useCookies();
  const [sort, setSort] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const { Option } = Select;
  const [selectedOrder, setSelectedOrder] = useState("notstarted");
  const [onGoingOrders, setOnGoingOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [notStarted, setNotStarted] = useState([]);
  const [hitOrdersAPI, setOrdersAPI] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [CSVdata, setCSVData] = useState([]);
  const [page, setPage] = useState(10);
  const [dateFilterData, setDateFilterData] = useState([]);
  const [filterSelected, setSelectedFilter] = useState("all");
  const { company } = useSelector((state) => state.user);

  useEffect(() => {
    setDateFilterData(_.get(orders, "orders", []));
  }, [orders]);

  const handleChange = () => {};

  const handleDateChange = (data = null, info) => {
    setSelectedFilter(info);
    if (data) {
      const newOrders = dateFilter(
        _.get(orders, "orders"),
        _.get(data[0], "_d"),
        _.get(data[1], "_d"),
        "createdAt"
      );
      setDateFilterData(newOrders.length === 0 ? [] : newOrders);
    } else if (info) {
      setDateFilterData(_.get(orders, "orders"));
      setSelectedFilter("all");
    }
    if (info === "week") {
      const newOrders = dateFilter(
        _.get(orders, "orders"),
        getDate(new Date(), 7),
        new Date(),
        "createdAt"
      );
      setDateFilterData(newOrders);
    } else if (info === "day") {
      const newOrders = dateFilter(
        _.get(orders, "orders"),
        getDate(new Date(), 1),
        new Date(),
        "createdAt"
      );
      setDateFilterData(newOrders);
    } else if (info === "month") {
      const newOrders = dateFilter(
        _.get(orders, "orders"),
        getDate(new Date(), 30),
        new Date(),
        "createdAt"
      );
      setDateFilterData(newOrders);
    } else if (info === "year") {
      const newOrders = dateFilter(
        _.get(orders, "orders"),
        getDate(new Date(), 365),
        new Date(),
        "createdAt"
      );
      setDateFilterData(newOrders);
    } else if (info === "quarter") {
    } else if (info === "all") {
      setDateFilterData(_.get(orders, "orders"));
    }
  };

  const handleEdit = (data) => {
    setOrderData(data);
    setUpdateModal(true);
  };

  const handleOrdersUpdate = (data) => {
    get(data, "data.data.orders", []).map((data) => {
      data.createdAt = dateConverter(data.createdAt);
      return data;
    });

    setOrders(get(data, "data.data"));
    return orders;
  };

  const handleSortChange = (value) => {
    setSort(value);
  };

  const handleUpdate = (data) => {
    setOrderId(get(data, "_id"));
    setOpen(true);
  };

  const handleDelete = async (data) => {
    setLoading(true);
    try {
      await api.delete(`/api/v1/order/${get(data, "_id")}`, {
        headers: {
          Authorization: `Bearer ${cookie.session.token}`,
        },
      });
      setOrdersAPI(!hitOrdersAPI);
      notification.success({
        message: `${get(data, "orderCode")} has been deleted successfully.`,
      });
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
      notification.warn({
        message: get(err, "response.data.message", "Error"),
      });
    }
  };

  const handleClose = () => {
    setOpen(false);
    setOrderId(null);
  };

  const handleModalClose = () => {
    setUpdateModal(!updateModal);
    setOrdersAPI(!hitOrdersAPI);
  };

  useEffect(() => {
    let arr = [];
    for (const i in get(orders, "orders", [])) {
      arr.push(get(orders, "orders")[i]);
      arr[i].jewelryType = get(arr[i], "jewelryType", "").toUpperCase();
      arr[i].currentProcess = camelCaseToWord(
        get(arr[i], "currentProcess", "")
      );
      arr[i].typeOfMetal = camelCaseToWord(get(arr[i], "typeOfMetal", ""));
      arr[i].timeStarted = dateConverter(arr[i].timeStarted);
      arr[i].timeCompleted = dateConverter(arr[i].timeCompleted);
    }
    setCSVData(arr);
  }, [orders]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const orders = await api.get(`/api/v1/order?sort=${sort}`, {
          headers: {
            Authorization: `Bearer ${cookie.session.token}`,
          },
        });

        get(orders, "data.data.orders", []).map((data) => {
          data.createdAt = moment(data.createdAt).format(
            "MMMM DD, YYYY HH:mm:ss"
          );
          return data;
        });

        setOrders(get(orders, "data.data"));
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    })();
  }, [sort, open, hitOrdersAPI]);

  useEffect(() => {
    let c_Orders = [];
    let o_Orders = [];
    let n_Orders = [];
    if (dateFilterData.length === 0) {
      setNotStarted([]);
      setCompletedOrders([]);
      setOnGoingOrders([]);
    } else {
      for (const i in dateFilterData) {
        if (dateFilterData[i].isCompleted) {
          c_Orders.push(dateFilterData[i]);
        } else if (
          !dateFilterData[i].underProcess &&
          !dateFilterData[i].isCompleted
        ) {
          n_Orders.push(dateFilterData[i]);
        } else {
          o_Orders.push(dateFilterData[i]);
        }
        setNotStarted(n_Orders.reverse());
        setCompletedOrders(c_Orders.reverse());
        setOnGoingOrders(o_Orders.reverse());
      }
    }
  }, [dateFilterData]);

  return (
    <>
      {updateModal ? (
        <UpdateModal
          orderData={orderData}
          handleClose={handleModalClose}
          visible={updateModal}
        />
      ) : null}
      {open ? (
        <Modal
          open={open}
          orderId={orderId}
          handleClose={handleClose}
          handleOrdersUpdate={handleOrdersUpdate}
        />
      ) : null}
      <div
        style={{
          paddingLeft: "180px",
        }}
      >
        <div className={style.upperContainer}>
          <PersonalComponent />
        </div>
        <div className={style.lowerBody}>
          <h1>{get(orders, "onGoingOrders", 0)}</h1>
          <p>Ongoing orders</p>
          <div className={style.flexRow}>
            <ul>
              <li
                className={style.currlink}
                onClick={() => setSelectedOrder("notstarted")}
              >
                <div
                  className={style.LiItem}
                  style={{
                    color: `${
                      selectedOrder === "notstarted" ? "#02374e" : "grey"
                    }`,
                    borderBottom: `${
                      selectedOrder === "notstarted"
                        ? "2px solid #02374e"
                        : "none"
                    }`,
                    transition: "200ms ease",
                  }}
                >
                  New orders ({notStarted.length})
                </div>
              </li>
              <li
                className={style.currlink}
                onClick={() => {
                  setSelectedOrder("ongoing");
                }}
              >
                <div
                  className={style.LiItem}
                  style={{
                    color: `${
                      selectedOrder === "ongoing" ? "#02374e" : "grey"
                    }`,
                    borderBottom: `${
                      !(selectedOrder === "ongoing")
                        ? "none"
                        : "2px solid #02374e"
                    }`,
                    transition: "200ms ease",
                  }}
                >
                  In progress ({onGoingOrders.length})
                </div>
              </li>
              <li
                className={style.currlink}
                onClick={() => setSelectedOrder("completed")}
              >
                <div
                  className={style.LiItem}
                  style={{
                    color: `${
                      selectedOrder === "completed" ? "#02374e" : "grey"
                    }`,
                    borderBottom: `${
                      selectedOrder === "completed"
                        ? "2px solid #02374e"
                        : "none"
                    }`,
                    transition: "200ms ease",
                  }}
                >
                  Completed Orders ({completedOrders.length})
                </div>
              </li>
            </ul>
            <CSVLink
              data={CSVdata}
              headers={headers}
              filename={`${get(company, "name")}-orders`}
            >
              <AiOutlineCloudDownload
                size={28}
                className="cursor"
                color="#02374e"
              />
            </CSVLink>
          </div>
          <div className={style.card}>
            <div className={style.content}>
              <SearchInput orders={orders} />
              <div className={style.sortInput}>
                Sort By:
                <Select
                  className={style.select}
                  placeholder="Select Sort By"
                  onChange={handleSortChange}
                >
                  {options.map((data, idx) => {
                    return (
                      <Option value={data.value} key={idx}>
                        {data.name}
                      </Option>
                    );
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
          </div>
          <div className={style.card}>
            <div className={style.content}>
              <RangePicker onChange={handleDateChange} />
              <div className={style.range}>
                <button
                  style={{
                    color: filterSelected === "day" ? "#ffffff" : "",
                    background: filterSelected === "day" ? "#02374e" : "",
                    borderRadius: "20px",
                  }}
                  type="button"
                  onClick={() => handleDateChange([null], "day")}
                >
                  1D
                </button>
                <button
                  style={{
                    color: filterSelected === "week" ? "#ffffff" : "",
                    background: filterSelected === "week" ? "#02374e" : "",
                    borderRadius: "20px",
                  }}
                  type="button"
                  onClick={() => handleDateChange([null], "week")}
                >
                  1W
                </button>
                <button
                  style={{
                    color: filterSelected === "month" ? "#ffffff" : "",
                    background: filterSelected === "month" ? "#02374e" : "",
                    borderRadius: "20px",
                  }}
                  type="button"
                  onClick={() => handleDateChange([null], "month")}
                >
                  1M
                </button>
                <button
                  style={{
                    color: filterSelected === "year" ? "#ffffff" : "",
                    background: filterSelected === "year" ? "#02374e" : "",
                    borderRadius: "20px",
                  }}
                  type="button"
                  onClick={() => handleDateChange([null], "year")}
                >
                  1Y
                </button>
                <button
                  style={{
                    color: filterSelected === "all" ? "#ffffff" : "",
                    background: filterSelected === "all" ? "#02374e" : "",
                    borderRadius: "20px",
                  }}
                  type="button"
                  onClick={() => handleDateChange([null], "all")}
                >
                  All
                </button>
              </div>
            </div>
          </div>
          <div className={style.card}>
            <OrderTable
              orders={
                selectedOrder === "ongoing"
                  ? onGoingOrders
                  : selectedOrder === "notstarted"
                  ? notStarted
                  : completedOrders
              }
              handleEdit={handleEdit}
              selectedOrder={selectedOrder}
              handleChange={handleChange}
              handleDelete={handleDelete}
              handleUpdate={handleUpdate}
              loading={loading}
              page={page}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;

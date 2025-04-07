import React, { useEffect, useState } from "react";
import style from "./Modal.module.css";
import { CgClose } from "react-icons/cg";
import { get } from "loadsh";
import ProgressBar from "./ProgressBar/ProgressBar";
import { BiErrorCircle } from "react-icons/bi";
import { Button, notification } from "antd";
import api from "../../../../http/api";
import { useCookies } from "react-cookie";
import ProgressContent from "./ProgressContent/ProgressContent";
import CompletedOrder from "./CompletedOrder/CompletedOrder";
import dateConverter from "../../../../constants/convertDate";
import Loader from "../../../../sharedComponents/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { setOrder, setProcess } from "../../../../store/orderSlice";

const Modal = (props) => {
  const dispach = useDispatch();
  const [animation, setAnimation] = useState(null);
  const { handleClose, open, orderId, handleOrdersUpdate } = props;
  const [cookie] = useCookies();
  const { data, process } = useSelector((state) => state.order);
  const [loading, setLoading] = useState(false);

  const underProcess = get(data, "underProcess");
  const isCompleted = get(data, "isCompleted");

  const handleStart = async () => {
    try {
      setLoading(true);
      const orders = await api.post(
        `/api/v1/order/${orderId}`,
        {
          quantityInput: get(data, "quantity", 1),
          weightInput: get(data, "weightInput"),
        },
        {
          headers: {
            Authorization: `Bearer ${cookie.session.token}`,
          },
        }
      );
      dispach(
        setProcess({
          process: "casting",
        })
      );
      dispach(
        setOrder({
          data: get(orders, "data.data.orders"),
        })
      );
      setLoading(false);
    } catch (err) {
      notification.error({
        message: get(err, "response.data.message", "Error"),
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    setAnimation(style.animation);
    const timer = setTimeout(() => {
      setAnimation(null);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [open]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const orderData = await api.get(`/api/v1/order/${orderId}`, {
          headers: {
            Authorization: `Bearer ${cookie.session.token}`,
          },
        });
        dispach(
          setOrder({
            data: get(orderData, "data.data.orders"),
          })
        );
        dispach(
          setProcess({
            process: get(orderData, "data.data.orders.currentProcess"),
          })
        );

        setLoading(false);
      } catch (err) {
        setLoading(false);
        notification.error({
          message: get(err, "response.data.message", "Error"),
        });
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const orderData = await api.get(`/api/v1/order/${orderId}`, {
          headers: {
            Authorization: `Bearer ${cookie.session.token}`,
          },
        });
        dispach(
          setOrder({
            data: get(orderData, "data.data.orders"),
          })
        );
        setLoading(false);
      } catch (err) {
        setLoading(false);
        notification.error({
          message: get(err, "response.data.message", "Error"),
        });
      }
    })();
  }, [process]);

  return !open ? null : (
    <>
      <div className={`${style.backDrop}`} onClick={handleClose}></div>
      <div
        className={`${style.cross} ${animation} ${
          isCompleted ? style.completedBtn : ""
        } `}
        onClick={handleClose}
      >
        <CgClose style={{ width: 24, height: 24 }} />
      </div>
      <div className={`${style.modal} ${animation}`}>
        {loading ? (
          <Loader />
        ) : (
          <>
            {!isCompleted ? (
              <>
                <div className={style.leftModal}>
                  <div className={style.container}>
                    <h1>Process Update</h1>
                    <div className={style.details}>
                      {" "}
                      <b>Order Code:</b> {get(data, "orderCode", "")}
                    </div>
                    <div className={style.details}>
                      {" "}
                      <b>Order Date:</b>{" "}
                      {dateConverter(get(data, "createdAt", ""))}
                    </div>
                    <div className={style.details}>
                      {" "}
                      <b>Jewelry:</b>{" "}
                      {get(data, "jewelryType", "").toUpperCase()}
                    </div>
                    <div className={style.details}>
                      {" "}
                      <b>Metal:</b> {get(data, "typeofMetal", "").toUpperCase()}
                    </div>
                    <div className={style.details}>
                      {" "}
                      <b>Current Process:</b> {process.toUpperCase()}
                    </div>
                    <div className={style.details}>
                      {" "}
                      <b>Design Code:</b> {get(data, "designCode", "")}
                    </div>
                    <div className={style.details}>
                      {" "}
                      <b>Weight Input:</b>{" "}
                      {get(data, "weightInput.$numberDecimal", 0)} gms
                    </div>
                    <div className={style.details}>
                      {" "}
                      <b>Quantity:</b> {get(data, "quantity", 1)} pcs
                    </div>
                    <div className={style.details}>
                      {" "}
                      <b>Ring Size:</b> {get(data, "ringSize")}
                    </div>
                    <div className={style.details}>
                      {" "}
                      <b>GemStone:</b> {get(data, "gemStone")}
                    </div>
                    <div className={style.details}>
                      {" "}
                      <b>Comment:</b> {get(data, "comment", "")}
                    </div>
                  </div>
                </div>
                <div className={style.rightModal}>
                  <div className={style.progressBar}>
                    <ProgressBar />
                  </div>
                  <div className={style.content}>
                    {!underProcess ? (
                      <>
                        <BiErrorCircle className={style.errorIcon} />
                        <p>
                          Currently order is not yet started. To start click on
                          the button below!
                        </p>
                        <Button onClick={handleStart}> Start </Button>
                      </>
                    ) : (
                      <ProgressContent
                        handleOrdersUpdate={handleOrdersUpdate}
                        data={data}
                        orderId={orderId}
                      />
                    )}
                  </div>
                </div>
              </>
            ) : (
              <>
                <CompletedOrder />
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Modal;

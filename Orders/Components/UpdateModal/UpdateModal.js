import { Modal, notification, Select, Upload } from "antd";
import { Formik } from "formik";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Button from "../../../../sharedComponents/Button/Button";
import Input from "../../../../sharedComponents/Input/Input";
import style from "./UpdateModal.module.css";
import _ from "loadsh";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import axios from "axios";
import api from "../../../../http/api";
import ringSize from "../../../../constants/ringSize";
import { UploadOutlined } from "@ant-design/icons";
import MiniLoader from "../../../../sharedComponents/MiniLoader/MiniLoader";

const { Option } = Select;

const UpdateModal = ({ visible, orderData, handleClose }) => {
  const jewelryType = ["ring", "earring", "bracelet", "necklace"];
  const typeofMetal = ["gold22", "gold18", "gold14", "silver"];
  const [loading, setLoading] = useState(false);
  const [cookie] = useCookies();
  const [designCode, setDesignCode] = useState([]);
  const [pageLoader, setPageLoader] = useState(false);
  const [gemStone, setGemStone] = useState([]);
  const [gemStoneData, setGemStoneData] = useState([]);
  const [selectedDesignCode, setSelectedDesignCode] = useState([]);

  const handleGemStone = (e) => {
    if (e.length > 1) {
      setGemStoneData([e[1]]);
    } else {
      setGemStoneData(e);
    }
  };

  const handleDesignCode = (e) => {
    if (e.length > 1) {
      setSelectedDesignCode([e[1]]);
    } else {
      setSelectedDesignCode(e);
    }
  };

  useEffect(() => {
    (async () => {
      setPageLoader(true);
      try {
        const data = await api.get(`/api/v1/storage/jewelry/designcode/`, {
          headers: {
            Authorization: `Bearer ${cookie.session.token}`,
          },
        });
        let arr = [];
        _.get(data, "data.data.storageData", []).map((code) =>
          arr.push(_.get(code, "code"))
        );
        setDesignCode(arr);
        const gemStoneData = await api.get(
          `/api/v1/storage/jewelry/gemstone/`,
          {
            headers: {
              Authorization: `Bearer ${cookie.session.token}`,
            },
          }
        );
        arr = [];
        _.get(gemStoneData, "data.data.storageData", []).map((gem) => {
          arr.push(_.get(gem, "name"));
        });
        setGemStone(arr);
      } catch (err) {
        console.log(err);
      }
      setPageLoader(false);
    })();
  }, [loading]);

  useEffect(() => {
    (async () => {
      setPageLoader(true);
      try {
        const data = await api.get(`/api/v1/storage/jewelry/designcode/`, {
          headers: {
            Authorization: `Bearer ${cookie.session.token}`,
          },
        });
        let arr = [];
        _.get(data, "data.data.storageData", []).map((code) =>
          arr.push(_.get(code, "code"))
        );
        setDesignCode(arr);
      } catch (err) {
        console.log(err);
      }
      setPageLoader(false);
    })();
  }, []);

  const handleValidate = (values) => {
    const errors = {};
    if (!values.quantity) {
      errors.quantity = "Reqired";
    }
    if (gemStoneData === []) {
      errors.gemStone = "required";
    }
    if (!values.ringSize) {
      errors.ringSize = "Required";
    }
    if (!values.typeofMetal) {
      errors.typeofMetal = "Required";
    }
    if (selectedDesignCode === []) {
      errors.designCode = "required";
    }
    return errors;
  };

  const handleOnSubmit = async (values) => {
    setLoading(true);
    try {
      if (!gemStone.includes(gemStoneData[0])) {
        await api.post(
          `/api/v1/storage/jewelry/gemStone/`,
          {
            name: gemStoneData[0],
          },
          {
            headers: {
              Authorization: `Bearer ${cookie.session.token}`,
            },
          }
        );
      }
      if (!designCode.includes(selectedDesignCode[0])) {
        await api.post(
          `/api/v1/storage/jewelry/designcode/`,
          {
            code: selectedDesignCode[0],
          },
          {
            headers: {
              Authorization: `Bearer ${cookie.session.token}`,
            },
          }
        );
      }
      const data = await api.patch(
        `/api/v1/order/${_.get(orderData, "_id")}`,
        {
          ...values,
          designCode: selectedDesignCode[0],
          gemStone: gemStoneData[0],
        },
        {
          headers: {
            Authorization: `Bearer ${cookie.session.token}`,
          },
        }
      );
      notification.success({
        message: `Your Order have been Updated. Order Code: ${_.get(
          data,
          "data.data.orders.orderCode"
        )}`,
      });
      handleClose();
    } catch (err) {
      console.log(err);
      console.log(err.response.data);
      notification.warn({
        message: _.get(err, "response.data.message", "Error"),
      });
    }
    setLoading(false);
  };

  return (
    <Modal
      visible={visible}
      width={"40%"}
      onCancel={handleClose}
      title={`Update ${_.get(orderData, "orderCode")}`}
      footer={null}
    >
      {pageLoader ? (
        <MiniLoader />
      ) : (
        <>
          <Formik
            validate={handleValidate}
            onSubmit={handleOnSubmit}
            initialValues={{
              jewelryType: jewelryType[0],
              quantity: 1,
              typeofMetal: typeofMetal[0],
              gemStone: "",
              designCode: "",
              comment: "",
              // weightInput: 1,
              ringSize: ringSize[0],
            }}
          >
            {({ values, errors, touched, handleChange, handleSubmit }) => (
              <form className={style.content}>
                <div className={style.selectInput}>
                  Jewelry Type
                  <select
                    name={"jewelryType"}
                    value={values.jewelryType}
                    onSelect={handleChange}
                    id=""
                    onChange={handleChange}
                    className={style.select}
                    style={{ textTransform: "capitalize" }}
                  >
                    {jewelryType.map((data, idx) => (
                      <option
                        style={{ textTransform: "capitalize" }}
                        value={data}
                        key={idx}
                      >
                        {data}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={style.selectInput}>
                  Quantity
                  <Input
                    name="quantity"
                    type="number"
                    value={_.get(values, "quantity")}
                    className={`
                        ${errors.quantity ? style.inputError : ""} ${
                      style.select
                    }
                        `}
                    defaultValue="1"
                    onChange={handleChange}
                    min="0"
                    max="100"
                    stringMode
                  ></Input>
                </div>
                <div className={style.selectInput}>
                  Metal Type
                  <select
                    name="typeofMetal"
                    value={_.get(values, "typeofMetal")}
                    className={`
                        ${errors.typeofMetal ? style.inputError : ""} ${
                      style.select
                    }
                        `}
                    onChange={handleChange}
                    placeholder="select"
                  >
                    {typeofMetal.map((data, idx) => (
                      <option value={data} key={idx}>
                        {data}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={style.selectInput}>
                  Metal Weight
                  <Input
                    name="weightInput"
                    value={_.get(values, "weightInput.$numberDecimal")}
                    className={`
                        ${errors.weightInput ? style.inputError : ""} ${
                      style.select
                    }
                        `}
                    onChange={handleChange}
                    defaultValue="1"
                    min="0"
                    type="number"
                    max="100"
                  ></Input>
                </div>
                <div className={style.selectInput}>
                  Ring Size
                  <select
                    name={"ringSize"}
                    value={values.ringSize}
                    onSelect={handleChange}
                    id=""
                    onChange={handleChange}
                    className={`
                        ${errors.ringSize ? style.inputError : ""} ${
                      style.select
                    }
                        `}
                    style={{ textTransform: "capitalize" }}
                  >
                    {ringSize.map((data, idx) => (
                      <option
                        style={{ textTransform: "capitalize" }}
                        value={data}
                        key={idx}
                      >
                        {data}
                      </option>
                    ))}
                  </select>
                </div>
                <div
                  className={style.selectInput}
                  style={{ marginTop: "12px" }}
                >
                  Gemstone Type
                  <Select
                    className={`
                        ${errors.gemStone ? style.inputError : ""} ${
                      style.selectBox
                    }
                        `}
                    value={gemStoneData}
                    onChange={handleGemStone}
                    mode="tags"
                    style={{
                      width: "100%",
                    }}
                  >
                    {gemStone.map((data) => (
                      <Option value={data}>{data}</Option>
                    ))}
                  </Select>
                  {/* <div className={style.inrow}>
                        <Input
                          name="gemStone"
                          value={values.gemStone}
                          onChange={handleChange}
                          type="text"
                          className={`
                        ${errors.gemStone ? style.inputError : ""}
                        `}
                          placeholder="Enter GemStone name."
                        />
                      </div> */}
                </div>
                <div
                  className={style.selectInput}
                  style={{ width: "100%", marginTop: "12px" }}
                >
                  Design Code
                  <div className={style.inrow}>
                    <Select
                      value={selectedDesignCode}
                      onChange={handleDesignCode}
                      className={`
                        ${errors.designCode ? style.inputError : ""} ${
                        style.selectBox
                      }
                        `}
                      mode="tags"
                      style={{ width: "40%" }}
                    >
                      {designCode.map((data) => {
                        return <Option value={data}>{data}</Option>;
                      })}
                    </Select>
                    {/* <select
                          name="designCode"
                          onSelect={handleChange}
                          onChange={handleChange}
                          value={get(values, "designCode")}
                          className={`
                        ${errors.designCode ? style.inputError : ""} ${style.select
                            }
                        `}
                          placeholder="select"
                        >
                          {designCode.map((data, idx) => (
                            <option value={data} key={idx}>
                              {data}
                            </option>
                          ))}
                        </select> */}
                    <div className={style.text_in}>or</div>
                    <Upload
                      onChange={handleChange}
                      name="design"
                      className={style.upload}
                    >
                      <UploadOutlined /> Upload file
                    </Upload>
                  </div>
                </div>
                <div
                  className={style.selectInput}
                  style={{ width: "100%", marginTop: 16 }}
                >
                  <div style={{ marginLeft: 2, marginBottom: 4 }}>
                    Add Comment
                  </div>
                  <Input
                    type="text"
                    onChange={handleChange}
                    value={_.get(values, "comment")}
                    name="comment"
                    placeholder="Add Comment"
                  />
                </div>
                <div className={style["place_order"]}>
                  <Button
                    type={"submit"}
                    loading={loading}
                    onClick={handleSubmit}
                    className={style["place_order"]}
                  >
                    Update Order
                  </Button>
                </div>
              </form>
            )}
          </Formik>
        </>
      )}
    </Modal>
  );
};

export default UpdateModal;

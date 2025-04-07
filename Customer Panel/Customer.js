import React, { useEffect, useState } from "react";
import PersonalComponent from "../../sharedComponents/PersonalComponent/PersonalComponent";
import style from "./Customer.module.css";
import { Upload, message, notification, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Button from "../../sharedComponents/Button/Button";
import { Formik } from "formik";
import { get } from "loadsh";
import Input from "../../sharedComponents/Input/Input";
import logo from "../../sharedComponents/Logo/logo";
import api from "../../http/api";
import { useCookies } from "react-cookie";
import MiniLoader from "../../sharedComponents/MiniLoader/MiniLoader";
import ringSize from "../../constants/ringSize";
import { useSelector } from "react-redux";

const { Option } = Select;

const Customer = () => {
  const jewelryType = ["ring", "earring", "bracelet", "necklace"];
  const typeofMetal = ["gold22", "gold18", "gold14", "silver"];
  const [loading, setLoading] = useState(false);
  const [cookie] = useCookies();
  const [designCode, setDesignCode] = useState([]);
  const [pageLoader, setPageLoader] = useState(false);
  const { user } = useSelector((state) => state.user);
  const [selectedDesignCode, setSelectedDesignCode] = useState([]);
  const [gemStone, setGemStone] = useState([]);
  const [gemStoneData, setGemStoneData] = useState([]);

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
        get(data, "data.data.storageData", []).map((code) =>
          arr.push(get(code, "code"))
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
        get(gemStoneData, "data.data.storageData", []).map((gem) => {
          arr.push(get(gem, "name"));
        });
        setGemStone(arr);
      } catch (err) {
        console.log(err);
      }
      setPageLoader(false);
    })();
  }, [loading]);

  const handleOnSubmit = async (values) => {
    setLoading(true);
    if (gemStoneData.length === 0 || selectedDesignCode.length === 0) {
      notification.warn({ message: "Please provide GemStone or DesignCode." });
    } else {
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
        const data = await api.post(
          `/api/v1/order/company/${get(user, "company")}`,
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
          message: `Your Order have been placed. Order Code: ${get(
            data,
            "data.data.orders.orderCode"
          )}`,
        });
      } catch (err) {
        console.log(err);
        notification.warn({
          message: get(err, "response.data.message", "Error"),
        });
      }
    }
    setLoading(false);
  };

  const handleValidate = (values) => {
    console.log("tes")
    console.log(gemStoneData, values, selectedDesignCode)
    const errors = {};
    if (!values.quantity) {
      errors.quantity = "Reqired";
    }
    if (gemStoneData.length === 0) {
      errors.gemStone = "required";
    }
    if (!values.ringSize) {
      errors.ringSize = "Required";
    }
    if (!values.typeofMetal) {
      errors.typeofMetal = "Required";
    }
    if (selectedDesignCode.length === 0) {
      errors.designCode = "required";
    }
    // return errors;
  };

  const props = {
    name: "file",
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <div
      style={{
        height: "100vh",
      }}
    >
      {pageLoader ? (
        <MiniLoader />
      ) : (
        <>
          <div className={style.upperContainer}>
            <PersonalComponent />
          </div>
          <div className={style.lowerComponent}>
            <div className={style.card}>
              <img alt="logo" src={logo} />
              <h2>All Spark</h2>
              <Formik
                validate={handleValidate}
                onSubmit={handleOnSubmit}
                initialValues={{
                  jewelryType: jewelryType[0],
                  quantity: 1,
                  typeofMetal: typeofMetal[3],
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
                        value={get(values, "quantity")}
                        className={`
                        ${errors.quantity ? style.inputError : ""} ${style.select
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
                        value={get(values, "typeofMetal")}
                        className={`
                        ${errors.typeofMetal ? style.inputError : ""} ${style.select
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
                    {/* <div className={style.selectInput}>
                      Metal Weight
                      <Input
                        name="weightInput"
                        value={get(values, "weightInput")}
                        className={`
                        ${errors.weightInput ? style.inputError : ""} ${style.select
                          }
                        `}
                        onChange={handleChange}
                        defaultValue="1"
                        min="0"
                        type="number"
                        max="100"
                      ></Input>
                    </div> */}
                    <div className={style.selectInput}>
                      Ring Size
                      <select
                        name={"ringSize"}
                        value={values.ringSize}
                        onSelect={handleChange}
                        id=""
                        onChange={handleChange}
                        className={`
                        ${errors.ringSize ? style.inputError : ""} ${style.select
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
                        ${errors.gemStone ? style.inputError : ""} ${style.selectBox
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
                        ${errors.designCode ? style.inputError : ""} ${style.selectBox
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
                          {...props}
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
                        value={get(values, "comment")}
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
                        Place Order
                      </Button>
                    </div>
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Customer;

import React, { useState } from "react";
import Button from "../../../../../../sharedComponents/Button/Button";
import Input from "../../../../../../sharedComponents/Input/Input";
import { Formik } from "formik";
import { get } from "loadsh";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import CompletedSetting from "./CompletedSetting";
import api from "../../../../../../http/api";
import { setProcess } from "../../../../../../store/orderSlice";
import { notification } from "antd";

const Setting = (props) => {
  const { style } = props;
  const [loading, setLoading] = useState(false);
  const [cookie] = useCookies();
  const dispach = useDispatch();

  const options = [
    { name: "ring", value: "ring" },
    { name: "earring", value: "earring" },
    { name: "bracelet", value: "bracelet" },
    { name: "necklace", value: "necklace" },
  ];

  let { data, id } = useSelector((state) => state.order);
  const order = data;
  data = get(data, "setting");
  const isCompleted = get(data, "isCompleted");

  const handleValidate = (value) => {
    value.weightInput = get(data, "weightInput.$numberDecimal");
    value.quantityInput = get(data, "quantity", 1);

    const errors = {};
    if (!value.quantityInput) {
      errors.quantityInput = "Required";
    }
    if (!value.weightInput) {
      errors.weightInput = "Required";
    }
    if (!value.quantityOutput) {
      errors.quantityOutput = "Required";
    }
    if (!value.weightOutput) {
      errors.weightOutput = "Required";
    }
    if (!value.typeOfStone) {
      errors.typeOfStone = "Required";
    }
    if (!value.designCode) {
      errors.designCode = "Required";
    }
    if (!value.weightOfFinding) {
      errors.weightOfFinding = "Required";
    }
    if (!value.weightOfStone) {
      errors.weightOfStone = "Required";
    }

    // if (value.weightOutput > value.weightInput) {
    //   errors.weightOutput = "Invalid value";
    // }
    return errors;
  };

  const handleOnSubmit = async (values) => {
    setLoading(true);
    try {
      await api.post(
        `/api/v1/process/setting/${id}`,
        {
          weightInput: get(values, "weightInput"),
          weightOutput: get(values, "weightOutput"),
          quantityOutput: get(values, "quantityOutput"),
          wastage: (
              get(values, "weightInput") * 1 +
              (get(values, "weightOfStone", 0) * 1) +
              (get(values, "weightOfFinding", 0) * 1) -
              get(
                values,
                "weightOutput",
                get(data, "weightInput.$numberDecimal") * 1
              )
            ).toFixed(2),
          jewelryType: get(values, "jewelryType"),
          designCode: get(values, "designCode"),
          typeOfStone: get(values, "typeOfStone"),
          stoneWeightInput: get(values, "weightOfStone"),
          weightOfFinding: get(values, "weightOfFinding"),
          comment: values.comment,
        },
        {
          headers: {
            Authorization: `Bearer ${cookie.session.token}`,
          },
        }
      );
      dispach(
        setProcess({
          process: "finalPolishing",
        })
      );
      setLoading(false);
      notification.success("Process Updated Successfully!");
    } catch (err) {
      setLoading(false);
      notification.warn(get(err, "response.data.message", "Error"));
      console.log(err);
    }
  };

  return isCompleted ? (
    <CompletedSetting style={style} />
  ) : (
    <Formik
      initialValues={{
        weightInput: get(data, "weightInput.$numberDecimal"),
        quantityInput: get(data, "quantity"),
        comment: get(data, "comment"),
        quantityOutput: get(data, "quantity", 1),
        designCode: get(data, "designCode"),
        jewelryType: get(data, "jewelryType"),
        typeOfStone: get(order, "gemStone"),
        weightOfFinding: get(data, 'weightOfFinding'),
        weightOfStone: get(data, 'weightOfStone')
      }}
      validate={handleValidate}
      onSubmit={handleOnSubmit}
    >
      {({ values, errors, touched, handleChange, handleSubmit }) => (
        <form>
          <div className={style.container}>
            <div className={style.gridCell}>
              <label htmlFor="">Weight Input:</label>
              <Input
                className={errors.weightInput ? style.inputError : null}
                name="weightInput"
                type="number"
                value={
                  values.weightInput || get(data, "weightInput.$numberDecimal")
                }
                onChange={handleChange}
              />
            </div>
            <div className={style.gridCell}>
              <label htmlFor="">Quantity Input:</label>
              <Input
                name="quantityInput"
                type="number"
                onChange={handleChange}
                className={errors.quantityInput ? style.inputError : null}
                value={values.quantityInput || get(data, "quantity", 1)}
              />
            </div>
            <div className={style.gridCell}>
              <label htmlFor="">Weight Output: </label>
              <Input
                name="weightOutput"
                type="number"
                className={errors.weightOutput ? style.inputError : null}
                onChange={handleChange}
                value={values.weightOutput}
              />
            </div>
            <div className={style.gridCell}>
              <label htmlFor="">Quantity Output:</label>
              <Input
                name="quantityOutput"
                type="number"
                className={errors.quantityOutput ? style.inputError : null}
                onChange={handleChange}
                value={values.quantityOutput}
              />
            </div>
            <div className={style.gridCell}>
              <label htmlFor="">Design Code:</label>
              <Input
                name="designCode"
                type="text"
                className={errors.designCode ? style.inputError : null}
                onChange={handleChange}
                value={values.designCode}
              />
            </div>
            <div className={style.gridCell}>
              <label htmlFor="">Type of Jewelry:</label>
              <select
                name={"jewelryType"}
                value={values.jewelryType}
                onSelect={handleChange}
                id=""
                onChange={handleChange}
                className={style.select}
                style={{ textTransform: "capitalize" }}
              >
                {options.map((data, idx) => {
                  return (
                    <option
                      style={{ textTransform: "capitalize" }}
                      value={data.value}
                      key={idx}
                    >
                      {data.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className={style.gridCell}>
              <label htmlFor="">Type Of Stone:</label>
              <Input
                name="typeOfStone"
                type="text"
                className={errors.typeOfStone ? style.inputError : null}
                onChange={handleChange}
                value={values.typeOfStone}
              />
            </div>
            <div className={style.gridCell}>
              <label htmlFor="">Weight Of Stone:</label>
              <Input
                name="weightOfStone"
                type="text"
                className={errors.weightOfStone ? style.inputError : null}
                onChange={handleChange}
                value={values.weightOfStone}
              />
            </div>
            <div className={style.gridCell}>
              <label htmlFor="">Weight Of Finding:</label>
              <Input
                name="weightOfFinding"
                type="text"
                className={errors.weightOfFinding ? style.inputError : null}
                onChange={handleChange}
                value={values.weightOfFinding}
              />
            </div>
          </div>
          <div className={style.comment}>
            <label htmlFor="">Comment:</label>
            <Input
              name="comment"
              type="text"
              value={values.comment || get(data, "comment")}
              onChange={handleChange}
            />
          </div>
          <div className={style.finalPart}>
            Wastage:{" "}
            {(
              get(values, "weightInput") * 1 +
              (get(values, "weightOfStone", 0) * 1) +
              (get(values, "weightOfFinding", 0) * 1) -
              get(
                values,
                "weightOutput",
                get(data, "weightInput.$numberDecimal") * 1
              )
            ).toFixed(2)}{" "}
            gm
            <Button
              type="submit"
              onClick={handleSubmit}
              className={style.completedButton}
              loading={loading}
            >
              Done
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default Setting;

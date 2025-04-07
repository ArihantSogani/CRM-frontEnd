import React, { useState } from "react";
import Button from "../../../../../../sharedComponents/Button/Button";
import Input from "../../../../../../sharedComponents/Input/Input";
import { Formik } from "formik";
import { get } from "loadsh";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import CompletedFinalPolishing from "./CompletedFinalPolishing";
import api from "../../../../../../http/api";
import { setProcess } from "../../../../../../store/orderSlice";
import { notification } from "antd";

const FinalPolishing = (props) => {
  const { style } = props;
  const [loading, setLoading] = useState(false);
  const [cookie] = useCookies();
  const dispach = useDispatch();

  let { data, id } = useSelector((state) => state.order);
  const { timeStarted, weightInput, setting } = data;
  data = get(data, "finalPolishing");
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

    if (value.weightOutput > value.weightInput) {
      errors.weightOutput = "Invalid value";
    }
    return errors;
  };

  const handleOnSubmit = async (values) => {
    setLoading(true);
    try {
      await api.post(
        `/api/v1/process/finalPolishing/${id}`,
        {
          weightOutput: values.weightOutput,
          quantityOutput: values.quantityOutput,
          timeStarted,
          totalWastage: (
            get(weightInput, "$numberDecimal") * 1 -
            get(values, "weightOutput") * 1 +
            get(values, "stoneWeightOutput") * 1 +
            get(setting, "weightOfFinding.$numberDecimal") * 1
          ).toFixed(2),
          wastage: (
            get(values, "weightInput") * 1 -
            get(values, "stoneWeightInput") * 1 -
            get(
              values,
              "weightOutput",
              get(data, "weightInput.$numberDecimal")
            ) *
              1 +
            get(values, "stoneWeightOutput", 0) * 1
          ).toFixed(2),
          comment: values.comment,
          stoneWeightInput: values.stoneWeightInput * 1,
          stoneWeightOutput: values.stoneWeightOutput * 1,
          stoneWastage:
            get(values, "stoneWeightInput") * 1 -
            get(values, "stoneWeightOutput") * 1,
        },
        {
          headers: {
            Authorization: `Bearer ${cookie.session.token}`,
          },
        }
      );
      dispach(
        setProcess({
          process: "filling",
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

  return (
    <>
      {isCompleted ? (
        <CompletedFinalPolishing />
      ) : (
        <Formik
          initialValues={{
            weightInput: get(data, "weightInput.$numberDecimal"),
            quantityInput: get(data, "quantityInput"),
            comment: get(data, "comment"),
            quantityOutput: get(data, "quantityOutput", 1),
            stoneWeightInput: get(data, "stoneWeightInput.$numberDecimal"),
            stoneWeightOutput: get(data, "stoneWeightOutput.$numberDecimal"),
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
                      values.castingweightInput ||
                      get(data, "weightInput.$numberDecimal")
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
                  <label htmlFor="">Input Weight Of Stone:</label>
                  <Input
                    name="stoneWeightInput"
                    type="number"
                    className={
                      errors.stoneWeightInput ? style.inputError : null
                    }
                    onChange={handleChange}
                    value={values.stoneWeightInput}
                  />
                </div>
                <div className={style.gridCell}>
                  <label htmlFor="">Output Weight Of Stone:</label>
                  <Input
                    name="stoneWeightOutput"
                    type="number"
                    className={
                      errors.stoneWeightOutput ? style.inputError : null
                    }
                    onChange={handleChange}
                    value={values.stoneWeightOutput}
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
                <div>
                  Wastage of metal:{" "}
                  {(
                    get(values, "weightInput") * 1 -
                    get(values, "stoneWeightInput") * 1 -
                    get(
                      values,
                      "weightOutput",
                      get(data, "weightInput.$numberDecimal")
                    ) *
                      1 +
                    get(values, "stoneWeightOutput", 0) * 1
                  ).toFixed(2)}{" "}
                  gm
                </div>
                <div>
                  Wastage of stone:{" "}
                  {(
                    get(values, "stoneWeightInput") * 1 -
                    get(values, "stoneWeightOutput", 0) * 1
                  ).toFixed(2)}{" "}
                  gm
                </div>
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
      )}
    </>
  );
};

export default FinalPolishing;

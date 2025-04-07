import React, { useState } from "react";
import Button from "../../../../../../sharedComponents/Button/Button";
import Input from "../../../../../../sharedComponents/Input/Input";
import { Formik } from "formik";
import { get } from "loadsh";
import { useDispatch, useSelector } from "react-redux";
import CompletedFiling from "./CompletedFiling";
import api from "../../../../../../http/api";
import { useCookies } from "react-cookie";
import { setProcess } from "../../../../../../store/orderSlice";
import { notification } from "antd";

const Filing = (props) => {
  const { style } = props;
  const [loading, setLoading] = useState(false);
  const [cookie] = useCookies();
  const dispach = useDispatch();

  let { data, id } = useSelector((state) => state.order);
  data = get(data, "filing");
  const isCompleted = get(data, "isCompleted");

  const handleValidate = (value) => {
    value.InputWeight = get(data, "weightInput.$numberDecimal");
    value.quantityInput = get(data, "quantity", 1);

    const errors = {};
    if (!value.quantityInput) {
      errors.quantityInput = "Required";
    }
    if (!value.InputWeight) {
      errors.InputWeight = "Required";
    }
    if (!value.quantityOutput) {
      errors.quantityOutput = "Required";
    }
    if (!value.weightOutput) {
      errors.weightOutput = "Required";
    }
    if (value.weightOutput > value.InputWeight) {
      errors.weightOutput = "Invalid value";
    }
    return errors;
  };

  const handleOnSubmit = async (values) => {
    setLoading(true);
    try {
      await api.post(
        `/api/v1/process/filling/${id}`,
        {
          weightOutput: get(values, "weightOutput"),
          comment: values.comment,
          quantityOutput: get(values, "quantityOutput"),
          wastage: (
            get(values, "weightInput") - get(values, "weightOutput")
          ).toFixed(2),
        },
        {
          headers: {
            Authorization: `Bearer ${cookie.session.token}`,
          },
        }
      );
      dispach(
        setProcess({
          process: "prePolish",
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
        <CompletedFiling style={style} />
      ) : (
        <Formik
          initialValues={{
            weightInput: get(data, "weightInput.$numberDecimal"),
            quantityInput: get(data, "quantity", 1),
            comment: get(data, "comment"),
            quantityOutput: get(data, "quantity", 1),
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
                    className={errors.InputWeight ? style.inputError : null}
                    name="weightInput"
                    type="number"
                    value={
                      values.weightInput ||
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
                  Wastage:{" "}
                  {(
                    get(values, "weightInput") -
                    get(
                      values,
                      "weightOutput",
                      get(data, "weightInput.$numberDecimal")
                    )
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

export default Filing;

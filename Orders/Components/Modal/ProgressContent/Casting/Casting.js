import React, { useState } from "react";
import Button from "../../../../../../sharedComponents/Button/Button";
import Input from "../../../../../../sharedComponents/Input/Input";
import { Formik } from "formik";
import { get } from "loadsh";
import api from "../../../../../../http/api";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { notification } from "antd";
import CompletedCasting from "./CompletedCasting";
import { setProcess } from "../../../../../../store/orderSlice";

const Casting = (props) => {
  const { style } = props;
  const [loading, setLoading] = useState(false);
  const [cookie] = useCookies();
  const dispach = useDispatch();

  let { data, id } = useSelector((state) => state.order);
  data = get(data, "casting");
  const isCompleted = get(data, "isCompleted");

  const handleValidate = (value) => {
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
        `/api/v1/process/casting/${id}`,
        {
          weightOutput: values.weightOutput,
          weightInput: values.weightInput,
          quantityOutput: values.quantityOutput,
          wastage: (
            get(values, "weightInput") - get(values, "weightOutput")
          ).toFixed(2),
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
        <CompletedCasting style={style} />
      ) : (
        <Formik
          initialValues={{
            weightInput: get(data, "weightInput.$numberDecimal"),
            quantityInput: get(data, "quantity"),
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
                    className={errors.weightInput ? style.inputError : null}
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

export default Casting;

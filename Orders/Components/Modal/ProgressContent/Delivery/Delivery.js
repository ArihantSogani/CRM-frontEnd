import React, { useState } from "react";
import Button from "../../../../../../sharedComponents/Button/Button";
import Input from "../../../../../../sharedComponents/Input/Input";
import { Formik } from "formik";
import { get } from "loadsh";

const Delivery = (props) => {
  const { data, style } = props;
  const [loading, setLoading] = useState(false);

  const handleValidate = (value) => {
    value.InputWeight = get(data, "weightInput.$numberDecimal");
    value.InputQuantity = get(data, "quantity", 1);

    const errors = {};
    if (!value.InputQuantity) {
      errors.InputQuantity = "Required";
    }
    if (!value.InputWeight) {
      errors.InputWeight = "Required";
    }
    if (!value.OutputQuantity) {
      errors.OutputQuantity = "Required";
    }
    if (!value.OutputWeight) {
      errors.OutputWeight = "Required";
    }

    if (value.OutputWeight > value.InputWeight) {
      errors.OutputWeight = "Invalid value";
    }
    return errors;
  };

  const handleOnSubmit = async (values) => {
    setLoading(true);
    console.log(values);
    try {
      // const data = await api.post()
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  return (
    <Formik
      initialValues={{
        InputWeight: get(data, "weightInput.$numberDecimal"),
        InputQuantity: get(data, "quantity"),
        Comment: get(data, "comment"),
        OutputQuantity: get(data, "quantity", 1),
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
                name="InputWeight"
                type="number"
                value={
                  values.castingInputWeight ||
                  get(data, "weightInput.$numberDecimal")
                }
                onChange={handleChange}
              />
            </div>
            <div className={style.gridCell}>
              <label htmlFor="">Quantity Input:</label>
              <Input
                name="InputQuantity"
                type="number"
                onChange={handleChange}
                className={errors.InputQuantity ? style.inputError : null}
                value={values.InputQuantity || get(data, "quantity", 1)}
              />
            </div>
            <div className={style.gridCell}>
              <label htmlFor="">Weight Output: </label>
              <Input
                name="OutputWeight"
                type="number"
                className={errors.OutputWeight ? style.inputError : null}
                onChange={handleChange}
                value={values.OutputWeight}
              />
            </div>
            <div className={style.gridCell}>
              <label htmlFor="">Quantity Output:</label>
              <Input
                name="OutputQuantity"
                type="number"
                className={errors.OutputQuantity ? style.inputError : null}
                onChange={handleChange}
                value={values.OutputQuantity}
              />
            </div>
          </div>
          <div className={style.comment}>
            <label htmlFor="">Comment:</label>
            <Input
              name="Comment"
              type="text"
              value={values.Comment || get(data, "comment")}
              onChange={handleChange}
            />
          </div>
          <div className={style.finalPart}>
            <div>Wastage: {get(data, "wastage")} </div>
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

export default Delivery;

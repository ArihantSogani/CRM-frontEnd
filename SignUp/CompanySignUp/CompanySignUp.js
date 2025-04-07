import { notification } from "antd";
import { Formik } from "formik";
import { get } from "lodash";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../http/api";
import Button from "../../../sharedComponents/Button/Button";
import Input from "../../../sharedComponents/Input/Input";
import style from "./Company.module.css";
import { useNavigate } from "react-router";

const CompanySignUp = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleValidate = (value) => {
    const errors = {};
    if (!value.email) {
      errors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value.email)) {
      errors.email = "Invalid email address";
    }
    if (!value.password) {
      errors.password = "Required";
    }
    if (!value.passwordConfirm) {
      errors.passwordConfirm = "Required";
    }
    if (value.password !== value.passwordConfirm) {
      errors.password = "Not Same";
      errors.passwordConfirm = "Not Same";
    }

    return errors;
  };

  const handleOnSubmit = async (values) => {
    setLoading(true);
    try {
      await api.post(`/api/v1/company/signup`, values);
      notification.success({
        message: "Company Created Successfully!",
      });
      navigate("/");
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
      notification.warn({
        message: get(err, "response.data.message", "Error"),
      });
    }
  };

  return (
    <div className={style.card}>
      <h1>Create Your New Company’s Account</h1>
      <Formik
        onSubmit={handleOnSubmit}
        validate={handleValidate}
        initialValues={{
          name: "",
          email: "",
          password: "",
          passwordConfirm: "",
          mobileNumber: "",
          logo: "",
        }}
      >
        {({ values, errors, touched, handleChange, handleSubmit }) => (
          <form action="">
            <div>
              <div className={style.container}>
                <img src={values.logo} alt="" />
                <Input
                  name="logo"
                  value={values.logo}
                  onChange={handleChange}
                  type="file"
                />
              </div>
              <div className={style.container}>
                <label htmlFor="name">Company's Name</label>
                <Input
                  name="name"
                  type="text"
                  className={
                    errors.name && touched.name ? style.inputError : null
                  }
                  onChange={handleChange}
                  value={values.name}
                />
                <label htmlFor="password">Company's Password</label>
                <Input
                  name="password"
                  type="password"
                  className={
                    errors.password && touched.password
                      ? style.inputError
                      : null
                  }
                  onChange={handleChange}
                  value={values.password}
                />
                <label htmlFor="mobileNumber">Company's Mobile No.</label>
                <Input
                  name="mobileNumber"
                  type="number"
                  onChange={handleChange}
                  value={values.mobileNumber}
                />
              </div>
              <div className={style.container}>
                <label htmlFor="email">Company's Email</label>
                <Input
                  name="email"
                  type="email"
                  className={
                    errors.email && touched.email ? style.inputError : null
                  }
                  onChange={handleChange}
                  value={values.email}
                />
                <label htmlFor="passwordConfirm">Confirm Password</label>
                <Input
                  name="passwordConfirm"
                  type="password"
                  className={
                    errors.passwordConfirm && touched.passwordConfirm
                      ? style.inputError
                      : null
                  }
                  onChange={handleChange}
                  value={values.passwordConfirm}
                />
              </div>
            </div>
            <Button
              loading={loading}
              onClick={handleSubmit}
              type="submit"
              className={style.button}
            >
              SignUp
            </Button>
            <p>
              Already have an account? <Link to="/">Login</Link>
            </p>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default CompanySignUp;

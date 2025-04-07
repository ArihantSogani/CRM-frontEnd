import { notification } from "antd";
import { Formik } from "formik";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../http/api";
import Button from "../../../sharedComponents/Button/Button";
import Input from "../../../sharedComponents/Input/Input";
import style from "../CompanySignUp/Company.module.css";
import { useNavigate } from "react-router";
import { get } from "lodash";
import { useSelector } from "react-redux";
import { useCookies } from "react-cookie";

const CustomerSignUp = ({ type, ...props }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, isCompany } = useSelector((state) => state.user);
  const [cookie] = useCookies();

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
      if (isCompany) {
        await api.post(
          `/api/v1/company/companyuser/${type}`,
          values,
          {
            headers: {
              Authorization: `Bearer ${cookie.session.token}`,
            },
          }
        );
      } else if (!user) {
        await api.post(`/api/v1/user/signupCustomer`, values);
        navigate("/");
      } else {
        await api.post(`/api/v1/user/${type}`, values, {
          headers: {
            Authorization: `Bearer ${cookie.session.token}`,
          },
        });
      }
      notification.success({
        message: "Account Created Successfully!",
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

  return (
    <div className={style.card}>
      <h1>Create Your New Account</h1>
      <Formik
        validate={handleValidate}
        onSubmit={handleOnSubmit}
        initialValues={{
          name: "",
          email: "",
          password: "",
          passwordConfirm: "",
          mobileNumber: "",
          profileImage: "",
        }}
      >
        {({ values, errors, touched, handleChange, handleSubmit }) => (
          <form action="">
            <div>
              <div className={style.container}>
                <img src={values.profileImage} alt="" />
                <Input
                  name="profileImage"
                  value={values.profileImage}
                  onChange={handleChange}
                  type="file"
                />
              </div>
              <div className={style.container}>
                <label htmlFor="name">Name</label>
                <Input
                  name="name"
                  type="text"
                  className={
                    errors.name && touched.name ? style.inputError : null
                  }
                  onChange={handleChange}
                  value={values.name}
                />
                <label htmlFor="password">Password</label>
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
                <label htmlFor="mobileNumber">Mobile No.</label>
                <Input
                  name="mobileNumber"
                  type="number"
                  onChange={handleChange}
                  // className={
                  //   errors.mobileNumber && touched.mobileNumber ? style.inputError : null
                  // }
                  value={values.mobileNumber}
                />
              </div>
              <div className={style.container}>
                <label htmlFor="email">Email</label>
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
              type="submit"
              onClick={handleSubmit}
              loading={loading}
              className={style.button}
            >
              {!user ? <>SignUp</> : <>Create Account</>}
            </Button>
            <p>
              {!user ? (
                <>
                  Already have an account? <Link to="/">Login</Link>
                </>
              ) : null}
            </p>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default CustomerSignUp;

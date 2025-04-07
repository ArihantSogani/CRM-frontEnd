import React, { useState } from "react";
import style from "./Login.module.css";
import Input from "../../sharedComponents/Input/Input";
import Button from "../../sharedComponents/Button/Button";
import { Formik } from "formik";
import api from "../../http/api";
import { useDispatch } from "react-redux";
import { setAuth } from "../../store/authSlice";
import { get } from "loadsh";
import { useNavigate } from "react-router";
import { useCookies } from "react-cookie";
import { Checkbox, notification } from "antd";
import { Link } from "react-router-dom";
import { admin, customer } from "../../constants/role.constants";

const Login = () => {
  const dispach = useDispatch();
  const navigate = useNavigate();
  const [cookie, setCookie, removeCookie] = useCookies();
  const [loading, setLoading] = useState(false);
  const [isCompany, setIsCompany] = useState(false);

  const handleCompany = (e) => {
    setIsCompany(e.target.checked);
  };

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
    return errors;
  };

  const handleOnSubmit = async (values) => {
    setLoading(true);
    try {
      if (isCompany) {
        const company = await api.post("/api/v1/company/login", values);
        if (cookie.session) {
          removeCookie("session");
        }
        setCookie(
          "session",
          { token: get(company, "data.token"), path: "/" },
          {
            maxAge: 24 * 60 * 60 * 30 * 1,
          }
        );
        dispach(setAuth({ company: get(company, "data.data.company") }));
        navigate("/");
      } else {
        const user = await api.post("/api/v1/user/login", values);
        if (cookie.session) {
          removeCookie("session");
        }
        setCookie(
          "session",
          { token: get(user, "data.token"), path: "/" },
          {
            maxAge: 24 * 60 * 60 * 30 * 1,
          }
        );
        dispach(
          setAuth({
            user: get(user, "data.data.user"),
            company: get(user, "data.data.user.company"),
          })
        );
        const role = get(user, "data.data.user.role");
        if (isCompany || role === admin || role === customer) {
          navigate("/");
        } else {
          navigate("/order");
        }
      }
      setLoading(false);
      notification.success({
        message: "Successfully Logged In!",
      });
    } catch (err) {
      console.log(err);
      setLoading(false);
      notification.error({
        message: get(err, "response.data.message", "Error"),
      });
    }
  };

  return (
    <div className={style.background}>
      <div className={style.card}>
        {/* <img src={logo} alt="" /> */}
        <h1>Welcome Back!</h1>
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={handleValidate}
          onSubmit={handleOnSubmit}
        >
          {({ values, errors, touched, handleChange, handleSubmit }) => (
            <form className={style.inputBox}>
              <Input
                name="email"
                style={{ marginBottom: "16px" }}
                placeholder="Enter Email"
                type="email"
                className={
                  errors.email && touched.email ? style.inputError : null
                }
                value={values.email}
                onChange={handleChange}
              />
              <Input
                name="password"
                placeholder="Enter Password"
                type="password"
                value={values.password}
                className={
                  errors.password && touched.password ? style.inputError : null
                }
                onChange={handleChange}
              />
              <Button
                type={"submit"}
                className={style.button}
                onClick={handleSubmit}
                loading={loading}
              >
                Login
              </Button>
            </form>
          )}
        </Formik>
        {/* <Checkbox className={style.checkbox} onChange={handleCompany}>
          For Company Login. Check this box.
        </Checkbox> */}
        <p>
          Are you a new user? <Link to="/signup">SignUp...</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

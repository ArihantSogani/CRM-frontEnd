/* eslint-disable react-hooks/exhaustive-deps */
import { get } from "loadsh";
import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import {
  Route,
  Routes,
  BrowserRouter as Router,
  Navigate,
} from "react-router-dom";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import api from "./http/api";
import { setAuth } from "./store/authSlice";
import Orders from "./Components/Orders/Orders";
import Stock from "./Components/Stock Maintanence/Stock";
import StockArrival from "./Components/Stock Maintanence/StockArrival";
import Reports from "./Components/Reports/Reports";
import Report from "./Components/Reports/OrderReport";
import Customer from "./Components/Customer Panel/Customer";
import Loader from "./sharedComponents/Loader/Loader";
import "antd/dist/antd.css";
import Navbar from "./sharedComponents/navbar/Navbar";
import NoPage from "./Components/NoPage/NoPage";
import { setLoadingFalse, setLoadingTrue } from "./store/LoadingSlice";
import Helmet from "react-helmet";
import logo from "./sharedComponents/Logo/logo";
import SignUp from "./Components/SignUp/SignUp";
import CompanySignUp from "./Components/SignUp/CompanySignUp/CompanySignUp";
import CustomerSignUp from "./Components/SignUp/CustomerrSignUp/CustomerSignUp";
import Background from "./Components/SignUp/Background/Background";
import { companyAdmin, customer, employee } from "./constants/role.constants";
import HomePage from "./Components/Admin/HomePage/HomePage";
import SignupPortal from "./Components/SignupPortal/SignupPortal";
import AddNewOrder from "./Components/AddNewOrder/AddNewOrder";
import EMS from "./Components/EMS/EMS";

function App() {
  const [cookie] = useCookies();
  const { isAuth, user, company, isCompany } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.loading);
  const role = get(user, "role");

  console.log(cookie)

  useEffect(() => {
    (async () => {
      if (cookie.session) {
        dispatch(setLoadingTrue());
        try {
          const user = await api.get("/api/v1/user/refresh", {
            headers: {
              Authorization: `Bearer ${cookie.session.token}`,
            },
          });
          console.log(cookie.session.token)
          dispatch(
            setAuth({
              user: get(user, "data.data.user"),
              company: get(user, "data.data.company"),
            })
          );
          dispatch(setLoadingFalse());
        } catch (err) {
          dispatch(setLoadingFalse());
          console.log(err);
        }
      }
    })();
  }, []);

  const isAuthCheck = (data) => {
    if (isAuth) {
      return data;
    }
    return <Login />;
  };

  return loading ? (
    <Loader />
  ) : (
    <>
      <Helmet>
        <title>{get(company, "name", "CRM")}</title>
        <link rel="icon" type="image/png" size="16x16" href={logo} />
      </Helmet>
      <Router>
        <Routes>
          <Route path="/signup" element={<Background />}>
            <Route index element={<SignUp />} />
            <Route path="company" element={<CompanySignUp />} />
            <Route path="customer" element={<CustomerSignUp />} />
          </Route>
          <Route path={"/"} element={!isAuth ? <Login /> : <Navbar />}>
            {role === customer ? <Route index element={<Customer />} /> : null}
            <Route
              index
              element={
                isCompany ? <Home /> : role === "admin" ? <HomePage /> : null
              }
            />
            {role === companyAdmin || role === employee ? (
              <>
                {isAuth ? (
                  <Route index element={<Navigate to="/order" />} />
                ) : null}
                <Route element={isAuthCheck(<Orders />)} path="order" />
                <Route
                  element={isAuthCheck(<Stock />)}
                  path="stockmaintanence"
                />
                <Route
                  element={isAuthCheck(<StockArrival />)}
                  path="stockmaintanence/stockarrival"
                />
                <Route element={isAuthCheck(<Reports />)} path="reports" />
                <Route
                  element={isAuthCheck(<Report />)}
                  path="reports/report"
                />
                <Route
                  element={isAuthCheck(<AddNewOrder />)}
                  path="addOrder"
                />
                {role === companyAdmin ? (
                  <Route
                    path="signupPortal"
                    element={isAuthCheck(<SignupPortal />)}
                  />
                ) : null}
                <Route path="ems" element={isAuthCheck(<EMS />)} />
              </>
            ) : null}
          </Route>
          {role === "customer" ? (
            <Route element={isAuthCheck(<Customer />)} path="/customerpanel" />
          ) : null}
          <Route path="*" element={!isAuth ? <Login /> : <NoPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

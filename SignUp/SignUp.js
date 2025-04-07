import React from "react";
import { Link } from "react-router-dom";
import style from "./SignUp.module.css";
import { BsBuilding } from "react-icons/bs";
import { CgUserAdd } from "react-icons/cg";

const SignUp = () => {
  return (
    <>
      <Link to="/signup/company" className={style.card}>
        <b>As a new</b>
        <BsBuilding />
        <h2>Company</h2>
      </Link>
      <Link to="/signup/customer" className={style.card}>
        <b>As a new</b>
        <CgUserAdd />
        <h2>Customer</h2>
      </Link>
    </>
  );
};

export default SignUp;

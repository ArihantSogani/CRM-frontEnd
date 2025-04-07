import React from "react";
import { Outlet } from "react-router";
import style from "./Background.module.css";

const Background = () => {
  return (
    <div className={style.background}>
      <Outlet />
    </div>
  );
};

export default Background;

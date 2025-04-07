import React from "react";
import style from "./Button.module.css";
import { BiLoaderAlt } from "react-icons/bi";

const Button = ({
  onClick,
  className,
  button,
  buttonStyle,
  loading,
  disabled,
  type,
  ...props
}) => {
  return (
    <button
      onClick={onClick}
      className={`${className} ${style.button}`}
      style={buttonStyle}
      disabled={disabled || loading}
      type={type}
    >
      {loading ? <BiLoaderAlt className={style.icon} /> : null}
      {props.children}
    </button>
  );
};

export default Button;

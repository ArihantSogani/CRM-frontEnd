import React from "react";
import style from "./Input.module.css";

const Input = ({
  type,
  defaultValue,
  value,
  alt,
  onChange,
  onClick,
  placeholder,
  disabled,
  max,
  min,
  inputStyle,
  name,
  className,
  ...props
}) => {
  return (
    <input
      type={type}
      defaultValue={defaultValue}
      value={value}
      alt={alt}
      onChange={onChange}
      onClick={onClick}
      placeholder={placeholder}
      disabled={disabled}
      max={max}
      min={min}
      style={inputStyle}
      name={name}
      className={`${className} ${style.input}`}
    />
  );
};

export default Input;

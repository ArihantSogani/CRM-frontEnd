import React from 'react'
import Customer from '../Customer Panel/Customer';
import style from "./AddNewOrder.module.css";

const AddNewOrder = () => {
  return (
    <div className={style.structure}>
      <Customer />
    </div>
  )
}

export default AddNewOrder
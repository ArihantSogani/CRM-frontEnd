import { Spin } from 'antd';
import React from 'react'
import style from "./MiniLoader.module.css";

const MiniLoader = () => {
  return (
    <div className={style.body}>
      <Spin size='large' />
    </div>
  )
}

export default MiniLoader
import React from 'react'
import style from "./Loader.module.css"

const Loader = () => {
  return (
    <div className={style.container}>
      <div className={style.dot}></div>
      <div className={style.dot}></div>
      <div className={style.dot}></div>
      <div className={style.dot}></div>
      <div className={style.dot}></div>
    </div>
  )
}

export default Loader
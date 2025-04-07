import React, { useEffect, useState } from "react";
import style from "./Modal_stock.module.css";
import { CgClose } from "react-icons/cg";
import ModalTable from "./ModalTable";
import { useSelector } from "react-redux";
import { get } from "loadsh";

const Modal_stock = (props) => {
  const { handleClose, open } = props;
  const { stockData } = useSelector(state => state.stock);

  const [animation, setAnimation] = useState(null);
  useEffect(() => {
    setAnimation(style.animation);
    const timer = setTimeout(() => {
      setAnimation(null);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [open]);

  return !open ? null : (
    <>
      <div className={`${style.backDrop}`} onClick={handleClose}>
        <div className={`${style.cross} ${animation}  `} onClick={handleClose}>
          <CgClose style={{ width: 24, height: 24 }} />
        </div>
        <div className={`${style.modal} ${animation}`}>
          {
            /* loading ? (<Loader />) : ( */
            <>
              <div className={style.container}>
                <div className={style.heading}>
                  <div
                    style={{
                      marginBottom: "0",
                    }}
                  >
                    <h1>{get(stockData, 'name')}</h1>
                  </div>
                  <div className={style.para}>
                    <p>{get(stockData, 'carat')}</p>
                  </div>
                </div>
                <h1>{get(stockData, 'weight')} gm</h1>
                <div className={style.Weight}>
                  <p>Current stock Weight </p>
                </div>

                <h3>Material Distribution</h3>
                <div className={style.table}>
                  <ModalTable />
                </div>
              </div>
            </>
            /* ) */
          }
        </div>
      </div>
    </>
  );
};

export default Modal_stock;

import React, { forwardRef } from "react";
import { useSelector } from "react-redux";
import ProcessContent from "../ProcessContent/ProcessContent";
import { get } from "loadsh";
import dateConverter from "../../../../../../constants/convertDate";
import dateDiff from "../../../../../../constants/dateDiff";

const ModalLower = forwardRef((props, ref) => {
  const { data } = useSelector((state) => state.order);
  const { casting, filing, prePolish, setting, finalPolishing } = data;
  const { style } = props;

  return (
    <div className={style.modalLower}>
      <div ref={ref}>
        <div className={style.titleBlock}>Order Detail:</div>
        <div className={style.contentBlock} style={{ height: "35%" }}>
          <div className={style.contentPair}>
            <b>Order Code</b>
            <b>:</b>
            <p>{get(data, "orderCode")}</p>
          </div>
          <div className={style.contentPair}>
            <b>Order Creation Date</b>
            <b>:</b>
            <p>{dateConverter(get(data, "createdAt"))}</p>
          </div>
          <div className={style.contentPair}>
            <b>Order Starting Date</b>
            <b>:</b>
            <p>{dateConverter(get(data, "timeStarted"))}</p>
          </div>
          <div className={style.contentPair}>
            <b>Order Completion Date</b>
            <b>:</b>
            <p>{dateConverter(get(data, "timeCompleted"))}</p>
          </div>
          <div className={style.contentPair}>
            <b>Order Total Time</b>
            <b>:</b>
            <p>
              {dateDiff(get(data, "timeCompleted"), get(data, "timeStarted"))}
            </p>
          </div>
          <div className={style.contentPair}>
            <b>Weight Input</b>
            <b>:</b>
            <p>{get(data, "weightInput.$numberDecimal")}</p>gm
          </div>
          <div className={style.contentPair}>
            <b>Weight Output</b>
            <b>:</b>
            <p>{get(data, "weightOutput.$numberDecimal", "NaN")}</p> gm
          </div>
          <div className={style.contentPair}>
            <b>Type Of Jewelry</b>
            <b>:</b>
            <p>{get(data, "jewelryType", "NaN")}</p>
          </div>
          <div className={style.contentPair}>
            <b>Type Of Stone</b>
            <b>:</b>
            <p>{get(data, "gemStone", "NaN")}</p>
          </div>
          <div className={style.contentPair}>
            <b>Design Code</b>
            <b>:</b>
            <p>{get(data, "designCode", "NaN")}</p>
          </div>
          <div className={style.contentPair}>
            <b>Order Status</b>
            <b>:</b>
            <p>{get(data, "currentProcess", "NaN")}</p>
          </div>
          <div className={style.contentPair}>
            <b>Wastage</b>
            <b>:</b>
            <p>
            {
              get(data, 'wastage.$numberDecimal')
            }
              {/* {(
                get(data, "weightInput.$numberDecimal") * 1 -
                get(data, "weightOutput.$numberDecimal") * 1 +
                get(data, "stoneWastage.$numberDecimal") * 1
              ).toFixed(2)} */}
            </p>
            {"  gm"}
          </div>
          <div className={style.contentPair}>
            <b>Wastage of Stone</b>
            <b>:</b>
            <p>{(get(data, "stoneWastage.$numberDecimal") * 1).toFixed(2)}</p>
            {"  gm"}
          </div>
          <div className={style.contentPair}>
            <b>Weight of Finding</b>
            <b>:</b>
            <p>{(get(data, "findingWeight.$numberDecimal") * 1).toFixed(2)}</p>
            {"  gm"}
          </div>
          <div className={style.contentPair}>
            <b>Quatity</b>
            <b>:</b>
            <p>{get(data, "quantity", "NaN")}</p>
          </div>
          <div className={style.contentPair}>
            <b>Comment</b>
            <b>:</b>
            <p>{get(data, "comment")}</p>
          </div>
        </div>
        <div className={style.titleBlock}>Progress Detail:</div>
        <h1 className={style.progressTitle}>Casting:</h1>
        <ProcessContent process={casting} style={style} height="18%" />
        {/* <hr /> */}
        <h1 className={style.progressTitle}>Filling:</h1>
        <ProcessContent process={filing} style={style} height="18%" />
        <h1 className={style.progressTitle}>Pre Polishing:</h1>
        <ProcessContent process={prePolish} style={style} height="18%" />
        <h1 className={style.progressTitle}>Setting:</h1>
        <ProcessContent process={setting} style={style} height="18%" />
        <h1 className={style.progressTitle}>Final Polishing:</h1>
        <ProcessContent process={finalPolishing} style={style} height="18%" />
      </div>
    </div>
  );
});

export default ModalLower;

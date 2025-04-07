import React, { useRef } from "react";
import style from "./CompletedOrder.module.css";
import { BsCloudDownload } from "react-icons/bs";
import { BiPrinter } from "react-icons/bi";
import { useReactToPrint } from "react-to-print";
import ModalLower from "./ModalLower/ModalLower";
import { createPdfFromHtml } from "../../../../../constants/PDFconverter";

const CompletedOrder = () => {
  let componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleDownload = () => {
    createPdfFromHtml(componentRef.current);
  };

  return (
    <div className={style.modalContainer}>
      <div className={style.modalTop}>
        <h1>Order Report</h1>
        <div className={style.icons}>
          <BsCloudDownload onClick={handleDownload} />
          <BiPrinter onClick={handlePrint} />
        </div>
      </div>
      <ModalLower style={style} ref={componentRef} />
    </div>
  );
};

export default CompletedOrder;

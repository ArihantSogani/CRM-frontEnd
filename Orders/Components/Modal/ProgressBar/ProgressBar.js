import React, { useState, useEffect } from "react";
import style from "./ProgressBar.module.css";
import { TiTick } from "react-icons/ti";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useSelector } from "react-redux";

const ProgressBar = (props) => {
  const { process } = useSelector((state) => state.order);
  const [casting, setCasting] = useState(false);
  const [filling, setfilling] = useState(false);
  const [prePolish, setPrepolishing] = useState(false);
  const [setting, setSetting] = useState(false);
  const [finalPolishing, setFinalPolishing] = useState(false);
  const [delivery, setDelivery] = useState(false);

  useEffect(() => {
    if (
      process === "casting" ||
      process === "filling" ||
      process === "prePolish" ||
      process === "setting" ||
      process === "finalPolishing" ||
      process === "delivery"
    ) {
      setCasting(true);
    }
    if (
      process === "filling" ||
      process === "prePolish" ||
      process === "setting" ||
      process === "finalPolishing" ||
      process === "delivery"
    ) {
      setfilling(true);
    }
    if (
      process === "prePolish" ||
      process === "setting" ||
      process === "finalPolishing" ||
      process === "delivery"
    ) {
      setPrepolishing(true);
    }
    if (
      process === "setting" ||
      process === "finalPolishing" ||
      process === "delivery"
    ) {
      setSetting(true);
    }
    if (process === "finalPolishing" || process === "delivery") {
      setFinalPolishing(true);
    }
    if (process === "delivery") {
      setDelivery(true);
    }
  }, [process]);

  return (
    <div className={style.container}>
      <div className={style.structure}>
        <div
          className={`${style.dot} ${
            casting ? (filling ? style.filled : style.progressFilled) : null
          }`}
        >
          {filling ? (
            <TiTick style={{ fill: "white", width: 16, height: 16 }} />
          ) : casting ? (
            <AiOutlineLoading3Quarters
              style={{ fill: "white", width: 16, height: 16 }}
            />
          ) : null}
        </div>
        <div
          className={`${style.line} ${
            casting ? (filling ? style.filledLine : style.progressline) : null
          }`}
        ></div>
        <div
          className={`${style.dot} ${
            filling ? (prePolish ? style.filled : style.progressFilled) : null
          }`}
        >
          {prePolish ? (
            <TiTick style={{ fill: "white", width: 16, height: 16 }} />
          ) : filling ? (
            <AiOutlineLoading3Quarters
              style={{ fill: "white", width: 16, height: 16 }}
            />
          ) : null}
        </div>
        <div
          className={`${style.line} ${
            filling ? (prePolish ? style.filledLine : style.progressline) : null
          }`}
        ></div>
        <div
          className={`${style.dot} ${
            prePolish ? (setting ? style.filled : style.progressFilled) : null
          }`}
        >
          {setting ? (
            <TiTick style={{ fill: "white", width: 16, height: 16 }} />
          ) : prePolish ? (
            <AiOutlineLoading3Quarters
              style={{ fill: "white", width: 16, height: 16 }}
            />
          ) : null}
        </div>
        <div
          className={`${style.line} ${
            prePolish ? (setting ? style.filledLine : style.progressline) : null
          }`}
        ></div>
        <div
          className={`${style.dot} ${
            setting
              ? finalPolishing
                ? style.filled
                : style.progressFilled
              : null
          }`}
        >
          {finalPolishing ? (
            <TiTick style={{ fill: "white", width: 16, height: 16 }} />
          ) : setting ? (
            <AiOutlineLoading3Quarters
              style={{ fill: "white", width: 16, height: 16 }}
            />
          ) : null}
        </div>
        <div
          className={`${style.line} ${
            setting
              ? finalPolishing
                ? style.filledLine
                : style.progressline
              : null
          }`}
        ></div>
        <div
          className={`${style.dot} ${
            delivery
              ? finalPolishing
                ? style.filled
                : style.progressFilled
              : null
          }`}
        >
          {finalPolishing ? (
            <TiTick style={{ fill: "white", width: 16, height: 16 }} />
          ) : delivery ? (
            <AiOutlineLoading3Quarters
              style={{ fill: "white", width: 16, height: 16 }}
            />
          ) : null}
        </div>
      </div>
      <div className={style.info}>
        <div>Casting</div>
        <div>filling</div>
        <div>Pre Polishing</div>
        <div>Setting</div>
        <div>Final Polishing</div>
      </div>
    </div>
  );
};

export default ProgressBar;

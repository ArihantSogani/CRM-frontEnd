import React from 'react';
import style from "./Box.module.css";

const BoxShell = (props) => {
    return (
        <>
            <div className={style.box}>
                <div className={style.line}
                    style={{
                        marginBottom: "-10px",
                    }}>
                    <div className={style.name}>
                        <p>{props.name}</p>
                    </div>
                </div>
                <div className={style.line}
                    style={{
                        marginBottom: "-12px",
                    }}>
                    <div className={style.weight}>
                        <h2>18784.98 g</h2>
                    </div>
                    <div className={style.name}>
                        <p>Weight</p>
                    </div>
                </div>
                <div className={style.line}
                    style={{
                        marginBottom: "-12px",
                    }}>
                    <div className={style.weight}>
                        <h2>89763</h2>
                    </div>
                    <div className={style.name}>
                        <p>Quantity</p>
                    </div>
                </div>

            </div>
        </>
    )
}

export default BoxShell;
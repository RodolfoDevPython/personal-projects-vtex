import React from "react";
import style from "./style.css";

export function ButtonToCheckout({ handleOpen } : any) {


    return (

        <button className={style.buttonToCheckout} onClick={handleOpen}>
            Finalizar compra
        </button>            
        
    )

}
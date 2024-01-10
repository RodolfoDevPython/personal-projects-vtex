import React from "react"
import style from "./style.css"

export function Header({ title, describe }: any) {

    return (
        <div className={style.headerContainer}>
            <h3 className={style.headerTitle} >{title}</h3>

            <h5 className={style.headerSubTitle} >
                {describe}
            </h5>
        </div>
    )

}
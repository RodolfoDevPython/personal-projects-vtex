import React, { useEffect } from "react"

interface ToastNotificationsProps {
    showToast: boolean,
    onHandleClosed: (_ : boolean) => void,
    message: string,
    warning: boolean
}

import style from "./style.css";
import iconWarning  from "../../../assets/icons/sinal-de-alerta.png";
import iconSucess  from "../../../assets/icons/check-sucess.png";

export function ToastNotifications({
    showToast,
    onHandleClosed,
    message,
    warning
}: ToastNotificationsProps) {


    useEffect( () => {

        if(showToast === true) {
            setTimeout( () => onHandleClosed(false) , 2000);
        }

    }, [showToast])


    return (      
        <div 
            className={`${style.ButtonToast}
                ${!showToast && style.ButtonToastHidden}

                ${!warning && style.ButtonToastSucess}
            `}> 

            {
                !warning ? 
                (<img width="16px" src={iconSucess} alt="icon-sucess" />)
                :
                (<img src={iconWarning} alt="icon-warning" />)
            }
            
            
            {message}
        </div>
        
    )

}
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Header } from "../header";
import style from "./style.css";

export function StepSendCode() {

    const { step, exchangeProduct } = useSelector((state: any) => state.exchangeProduct);

    useEffect(() => {
        console.log({
            step,
            exchangeProduct
        })
    }, [])

    return (
        <>

            <Header
                title="Trocas e Devoluções"
                describe="Envie o seu pedido."
            />

            <div className={style.sendCode}>
                <p>Enviaremos o códio de postagem para envio da sua mercadoria no seu E-mail em até 5 dias úteis.</p>
            </div>

        </>

    )

}
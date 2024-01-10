import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Header } from "../header";
import style from "./style.css";

export function StepFollowExchange() {

    const { step, exchangeProduct } = useSelector((state: any) => state.exchangeProduct);
    const [showCode, setShowCode] = useState(false);
    const [cancel, setCancel]: any = useState({
        showBoxCancel: false,
        showMessageCancelConfirmation: false
    });

    /**
    * @todo Implementar Busca de Codigo dos Correios
    * @body Precisar pegar os dados do código dos correios para seguir com o processo de devolução do produto
    * API : http://228bqi.dsv.protheus.totvscloud.com.br:8888/rest/api/asicsChanges/v1/changeRequest/?changeId=0000000019"
    */
    const code = "LE366531974SE";

    useEffect(() => {
        console.log({
            step,
            exchangeProduct
        })
    }, [])

    async function handleCopyCode() {

        setShowCode(true);

        try {
            await navigator.clipboard.writeText(code);
        } catch (error) {
            console.error(error);
        }

        try {
            const text = await navigator.clipboard.readText();
            console.log(text);
        } catch (error) {
            console.error(error);
        }

        //d]Delay fake for animations
        setTimeout(() => {
            setShowCode(false);
        }, 2500)

    }

    function handleCancel(value: boolean) {

        setCancel({ ...cancel, showBoxCancel: value })

    }

    return (

        <>
            {
                !cancel.showBoxCancel ?

                    (

                        <>
                            <Header
                                title="Trocas e Devoluções"
                                describe="Pedido enviado."
                            />

                            <div className={style.containerInfo}>
                                <p>Leve seu produto até uma agência dos correio, copie o código abaixo, e envie o produto até nós. Seu produto será enviado para nós em um prazo de 7 dias úteis, após ser entregue será feita a avaliação do produto.</p>
                                <span>{code}</span>
                                <p>Após avaliação será enviado o seu produto.</p>

                                <div>
                                    <button
                                        className={style.btnCancelExchange}
                                        onClick={() => handleCancel(true)}
                                    >Cancelar troca/devolução</button>
                                    <button
                                        className={style.btnCopyExchange}
                                        onClick={handleCopyCode}
                                    >Copiar código dos correios</button>
                                </div>


                                <dialog open className={showCode && style.dialogFloat}>
                                    <p>Código copiado</p>
                                </dialog>


                            </div>
                        </>
                    )
                    : (

                        cancel.showMessageCancelConfirmation ?
                            //step - Confirmação de cancelamento
                            (
                                <>
                                    <Header
                                        title="Trocas e Devoluções"
                                        describe="Troca/devolução cancelada."
                                    />

                                    <div className={style.containerInfo}>
                                        <p>Sua troca/devolução foi cancelada com sucesso.</p>
                                    </div>
                                </>
                            ) :
                            (
                                <>
                                    <Header
                                        title="Trocas e Devoluções"
                                        describe="Cancelar troca/devolução."
                                    />

                                    <div className={style.containerInfo}>
                                        <p>Você tem certeza que deseja cancelar sua troca/devolução?</p>
                                        <div>
                                            <button
                                                className={style.btnCancelExchangeConfirm}
                                                onClick={() => setCancel({ ...cancel, showMessageCancelConfirmation: true })}
                                            >
                                                Sim
                                            </button>
                                            <button
                                                className={style.btnCancelExchangeNotConfirm}
                                                onClick={() => handleCancel(false)}
                                            >
                                                Não
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )

                    )
            }

        </>

    )

}
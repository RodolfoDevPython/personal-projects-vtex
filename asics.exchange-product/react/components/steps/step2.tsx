// import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Header } from "../header";
import { TableBody } from "../tableBody";
import { TabletHeader } from "../tabletHeader";
import style from "./style.css";


export function Step2(props: any) {

    const { step, creationDate, orderId, selectItemOrder } = useSelector((state: any) => state.exchangeProduct);

    const [selectedItems, setSelectedItems]: any = useState([]);

    const [available, setAvailable]: any = useState(true);
    //Precisar realizar o get dos products que podem ser trocados
    //por esse orderId utilizando essa rota - > /_v/app/exchangeProducts/:orderId/

    useEffect(() => {

        console.log({
            available
        })
    }, [available]);

    function handleExchangeProducts(valInput: any) {

        const jsonParse = JSON.parse(valInput)
        const existIsProduct = selectedItems.find((e: any) => e.productId == valInput.productId);

        console.log({
            jsonParse,
            id: jsonParse.id
        })

        if (existIsProduct) {
            const distinct = selectedItems.filter((e: any) => e.productId != jsonParse.productId);

            setSelectedItems([...distinct]);
        } else {
            setSelectedItems([...selectedItems, jsonParse]);
        }

    }

    function chooseExchangeProducts() {

        props.update({
            step: 3,
            exchangeProduct: selectedItems
        })

    }

    async function verifyAvailableExchangeProduct(refId: any) {

        const { status } = await fetch(`/_v/app/checkExchangeProduct/orderId/${orderId}/refer/${refId}`);

        console.log({
            status
        })

        if (status == 401) {
            setAvailable(true)
        } else {
            setAvailable(true)
        }

    }

    return (
        <>
            <Header
                title="Trocas e Devoluções"
                describe="Selecione o produto para fazer a troca/devolução"
            />

            <table className={style.tableContainer}>
                <TabletHeader
                    dateOrder={creationDate}
                    total="0"
                    orderId={orderId}
                />


                {
                    selectItemOrder.map(({
                        name,
                        imageUrl,
                        listPrice,
                        refId
                    }: any) => {
                        verifyAvailableExchangeProduct(refId);

                        return (
                            <TableBody
                                {...props}
                                price={listPrice}
                                img={imageUrl}
                                step={step}
                                refId={refId}
                                available={available}
                                handleExchangeProducts={handleExchangeProducts}
                                productName={name}
                            />
                        )
                    }
                    )
                }


            </table>


            {
                available && (
                    <button
                        className={style.btnExchangeProduct}
                        disabled={selectedItems.length > 0 ? false : true}
                        onClick={chooseExchangeProducts}
                    >Solicitar troca/devolução</button>

                )
            }

        </>

    )

}
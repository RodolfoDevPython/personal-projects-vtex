import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Header } from "../header";
import { PageLoaderDesktop } from "../skeleton-screen/desktop";
import { TableBody } from "../tableBody";
import { TabletHeader } from "../tabletHeader";
import style from "./style.css";


export function Step3(props: any) {

    const { step, selectItemOrder, creationDate, exchangeProduct, orderId } = useSelector((state: any) => state.exchangeProduct);
    const [error, setError] = useState(false);
    const [skus, setSkus]: any = useState(false);

    useEffect(() => {
        console.log({
            step,
            selectItemOrder,
            creationDate,
            exchangeProduct
        });

        async function fetchData() {
            // const resp = await fetch(`/_v/app/exchangeProductByOrder/${orderId}/product/${exchangeProduct[0].refId}`);
            const resp = await fetch(`/_v/app/exchangeProductByOrder/SCB-93134463002/product/1011B253.003.42`);
            const json = await resp.json();

            console.log({
                json
            })
            setSkus(json);
        }

        fetchData();

    }, [])

    useEffect(() => {
        console.log({
            skus
        });

    }, [skus])

    function handleExchangeProducts() {
        console.log({
            exchangeProduct
        })

        if (!exchangeProduct) return setError(true);

        setError(false);

        props.update({
            step: 4
        });
    }

    function goBack() {
        props.update({
            step: 2
        });
    }

    return (
        <>
            <Header
                title="Trocas e Devoluções"
                describe="Selecione o tamanho do novo produto"
            />

            <table className={style.tableContainer}>
                <TabletHeader
                    dateOrder={creationDate}
                    total="0"
                    orderId={orderId}
                />

                {
                    skus ? (
                        <TableBody
                            {...props}
                            step={step}
                            price="0"
                            img={skus.skuItems[0].ImageUrl}
                            productName={skus.productName}
                            skus={skus.skuItems}
                        />
                    ) :
                        (<PageLoaderDesktop />)
                }


            </table>

            <div className={style.containerButtons}>
                <button
                    className={style.btnGoBack}
                    onClick={goBack}
                >Voltar</button>

                <button
                    className={error ? style.btnNextError : style.btnNext}
                    onClick={handleExchangeProducts}
                >
                    Avançar
                </button>
            </div>

        </>

    )

}
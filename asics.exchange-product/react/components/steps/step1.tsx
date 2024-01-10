import React from "react";
import { useSelector } from "react-redux";
import { Header } from "../header";
import { PageLoaderDesktop } from "../skeleton-screen/desktop";
import { TableBody } from "../tableBody";
import { TabletHeader } from "../tabletHeader";
import style from "./style.css";


export function Step1(props: any) {

    const { step, items } = useSelector((state: any) => state.exchangeProduct);

    /**
    * @todo Implementar Status de Solicitação Dinâmico
    * @body Precisar pegar os dados do staus de solicitação do pedido de troca na api da totvs 
    * API : http://228bqi.dsv.protheus.totvscloud.com.br:8888/rest/api/asicsChanges/v1/changeRequest/?changeId=0000000019"
    */

    const status = false;

    return (

        <>
            <Header
                title="Trocas e Devoluções"
            />

            {
                items.length ?
                    items.map(({ orderId, product: [{ imageUrl, listPrice, name }], total, creationDate }: any) => (

                        <table className={style.tableContainer}>
                            <TabletHeader
                                dateOrder={creationDate}
                                total={total}
                                orderId={orderId}
                            />

                            <TableBody
                                {...props}
                                step={step}
                                items={items}
                                orderId={orderId}
                                price={listPrice}
                                img={imageUrl}
                                productName={name}
                                creationDate={creationDate}
                                status={status}
                            />

                        </table>
                    ))
                    :
                    (<PageLoaderDesktop />)
            }

        </>


    )

}
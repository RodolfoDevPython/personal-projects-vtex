import { useEffect } from "react";
import { useSelector } from "react-redux";
import { CurrencyFormat } from "../../utils/currencyFormat";
import { SkuSelector } from "../skuSelector";
import style from "./style.css";

export function TableBody({
    step,
    price,
    productName,
    img,
    update,
    orderId,
    creationDate,
    handleExchangeProducts,
    status,
    refId,
    available,
    skus
}: any) {

    const { items } = useSelector((state: any) => state.exchangeProduct);

    function handleRedirect() {
        console.log("handleRedirect");
        // dispatch({ type: "UPDATED_STEP", payload: { step: 2 } });
        const { product } = items.filter((e: any) => e.orderId == orderId)[0];

        console.log({
            update,
            orderId,
            product
        })

        update({ step: 2, creationDate, orderId, selectItemOrder: product });
    }

    function handleRedirectFollowExchange() {
        update({ step: 5, creationDate, orderId });
    }

    useEffect(() => {
        console.log({ step, productName, price })
    }, [])


    return (
        <tbody className={style.tbodyContainer}>

            {
                step == 1 && (
                    <tr>
                        <td className={style.tbodyImg}>
                            <img src={img} alt="" width="108" height="108" />
                        </td>
                        <td className={style.tbodyInfos}>
                            <span className={style.productName}>
                                {productName}
                            </span>
                            <span className={style.productPrice}>
                                {CurrencyFormat(price)}
                            </span>
                        </td>

                        <td className={style.tbodyBtns} >

                            {
                                !status ?
                                    (
                                        <button
                                            className={style.buttonExchange}
                                            onClick={handleRedirect}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
                                                <path d="M13.6719 0.75H12.3594C12.1953 0.75 12.0312 0.914062 12.0312 1.07812C12.0312 1.10547 12.0312 1.10547 12.0312 1.10547L12.1406 3.375C10.9102 1.89844 9.05078 0.96875 7 0.96875C3.25391 0.96875 0.191406 4.03125 0.21875 7.77734C0.21875 11.5234 3.25391 14.5312 7 14.5312C8.75 14.5312 10.3359 13.875 11.5391 12.8086C11.5938 12.7266 11.6484 12.6445 11.6484 12.5625C11.6484 12.4531 11.5938 12.3711 11.5391 12.3164L10.6094 11.3867C10.5547 11.332 10.4727 11.3047 10.3906 11.3047C10.3086 11.3047 10.2266 11.332 10.1719 11.3867C9.32422 12.125 8.20312 12.5625 7 12.5625C4.32031 12.5625 2.1875 10.4297 2.1875 7.75C2.1875 5.09766 4.32031 2.9375 7 2.9375C8.64062 2.9375 10.1172 3.78516 10.9922 5.07031L8.20312 4.93359C8.20312 4.93359 8.20312 4.93359 8.17578 4.93359C8.01172 4.93359 7.84766 5.09766 7.84766 5.26172H7.875V6.57422C7.875 6.73828 8.01172 6.90234 8.20312 6.90234H13.6719C13.8359 6.90234 14 6.73828 14 6.57422V1.07812C14 0.914062 13.8359 0.75 13.6719 0.75Z" fill="#FF4C4C" />
                                            </svg>
                                            Solicitar Troca/Devolução
                                        </button>
                                    )
                                    : (
                                        <button
                                            className={style.buttonFollowExchange}
                                            onClick={handleRedirectFollowExchange}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
                                                <path d="M13.6719 0.75H12.3594C12.1953 0.75 12.0312 0.914062 12.0312 1.07812C12.0312 1.10547 12.0312 1.10547 12.0312 1.10547L12.1406 3.375C10.9102 1.89844 9.05078 0.96875 7 0.96875C3.25391 0.96875 0.191406 4.03125 0.21875 7.77734C0.21875 11.5234 3.25391 14.5312 7 14.5312C8.75 14.5312 10.3359 13.875 11.5391 12.8086C11.5938 12.7266 11.6484 12.6445 11.6484 12.5625C11.6484 12.4531 11.5938 12.3711 11.5391 12.3164L10.6094 11.3867C10.5547 11.332 10.4727 11.3047 10.3906 11.3047C10.3086 11.3047 10.2266 11.332 10.1719 11.3867C9.32422 12.125 8.20312 12.5625 7 12.5625C4.32031 12.5625 2.1875 10.4297 2.1875 7.75C2.1875 5.09766 4.32031 2.9375 7 2.9375C8.64062 2.9375 10.1172 3.78516 10.9922 5.07031L8.20312 4.93359C8.20312 4.93359 8.20312 4.93359 8.17578 4.93359C8.01172 4.93359 7.84766 5.09766 7.84766 5.26172H7.875V6.57422C7.875 6.73828 8.01172 6.90234 8.20312 6.90234H13.6719C13.8359 6.90234 14 6.73828 14 6.57422V1.07812C14 0.914062 13.8359 0.75 13.6719 0.75Z" fill="#001A57" />
                                            </svg>
                                            Acompanhar Troca
                                        </button>
                                    )

                            }

                            <a className={style.buttonShowOrder} href={`account#/orders/${orderId}`} >Ver detalhes do pedido</a>
                        </td>

                    </tr>
                )
            }

            {
                step == 2 && (
                    <>
                        <tr className={`${style.tbodyRow} ${!available && style.tbodyRowNotAvailable}`}>
                            <td className={style.tbodyImg}>
                                <img src={img} alt="" width="108" height="108" />
                            </td>
                            <td className={style.tbodyInfos}>
                                <span className={style.productName}>
                                    {productName}
                                </span>
                                <span className={style.productPrice}>
                                    {CurrencyFormat(price)}
                                </span>
                            </td>
                            <td className={style.tbodyCheckItems}>
                                <input
                                    className={style.checkItem}
                                    type="checkbox"
                                    id="check-exchange-item"
                                    value={JSON.stringify({ refId, nome: productName })}
                                    onClick={({ target: { value } }: any) => handleExchangeProducts(value)}
                                />
                            </td>

                        </tr>
                    </>

                )
            }


            {
                step == 3 && (
                    <tr className={style.tbodyRow}>
                        <td className={style.tbodyImg}>
                            <img src={img} alt="" width="108" height="108" />
                        </td>
                        <td className={style.tbodyInfos}>
                            <span className={style.productName}>
                                {productName}
                            </span>
                            <span className={style.productPrice}>
                                {price}
                            </span>

                            <SkuSelector update={update} skus={skus} />

                        </td>
                    </tr>
                )
            }


        </tbody>
    )
}

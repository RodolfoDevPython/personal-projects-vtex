import { CurrencyFormat } from "../../utils/currencyFormat";
import FormattedDate from "../../utils/formatDate";
import style from "./style.css";

export function TabletHeader({ dateOrder, total, orderId }: any) {


    return (
        <thead className={style.containerThead}>
            <tr>
                <th>
                    <div>
                        <span>Data do Pedido</span>
                        <strong>{FormattedDate(new Date(dateOrder))}</strong>
                    </div>
                </th>
                <th>
                    <div>
                        <span>TOTAL</span>
                        <strong>{CurrencyFormat(total)}</strong>
                    </div>
                </th>
                <th>
                    <div className={style.alignRight}>
                        <strong>#{orderId}</strong>
                    </div>
                </th>
            </tr>

        </thead>
    )
}

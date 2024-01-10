import style from "./style.css";

export function SkuSelector({ skus, update }: any) {

    console.log({
        skus
    })

    //get os skus do middleware vtex
    function handleSkuItems(value: any, checked: boolean) {

        console.log({
            value,
            checked
        });

        const skuChecked = document.querySelectorAll("input[id^='skuItem']");

        skuChecked.forEach((element: any) => {

            if (element.value == value) return;

            element.checked = false;

        });

        if (!checked) {
            //passar sku do product especifico como null
            update({ exchangeProduct: null });
        } else {
            update({ exchangeProduct: [{ sku: value }] });
        }

    }

    return (
        <div className={style.containerSkuSelector}>
            <div>


                {
                    skus.map(({ NameComplete }: any) => {

                        return (
                            <span className={style.skuItem}>
                                <input
                                    type="checkbox"
                                    id={`skuItem-${NameComplete.split("- tam:")[1]}`}
                                    value={`${NameComplete.split("- tam:")[1].trim()}`}
                                    onChange={({ target: { value, checked } }: any) => handleSkuItems(value, checked)}
                                />
                            </span>
                        )

                    })
                }

            </div>
        </div>
    )
}

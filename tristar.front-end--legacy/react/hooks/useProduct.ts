import { itemsProductsProps } from "../interfaces";

const Window: any = window
export function useProduct() {

    const selectedItem: itemsProductsProps[] = Window.skuJson_0.skus;

    function getQuantity() {
        const btnQuantidade = document.querySelector(".buy-button.buy-button-ref");
        const qtd = btnQuantidade?.getAttribute("href")?.split("?")[1]?.split("&")[1]?.split("=")[1];

        if (!qtd) return 0;

        return Number(qtd)
    }

    async function getSpecification() {

        try {
            const resp = await fetch(`/api/catalog_system/pub/products/search?fq=productId:${Window.skuJson_0.productId}`)
            const json = await resp.json();

            return json
        } catch (error) {
            return false
        }

    }

    return { selectedItem, selectedQuantity: () => getQuantity(), getSpecification };

}
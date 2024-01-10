
export function useOrderItems() {


    async function addItem({ sku, quantity, sellerId }: any) {

        const query = `sku=${sku}&qty=${quantity}&seller=${sellerId}`

        fetch(`/checkout/cart/add?${query}`)

    }

    return { addItem }
}
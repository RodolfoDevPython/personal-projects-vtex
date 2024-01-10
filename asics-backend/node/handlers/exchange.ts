function compareProductsForExchange(productsClient: any, productsTotvs: any) {

  let listProductExchange : any = [];

  productsClient.map(
    (productCl: any) => {

      let productExchange = productsTotvs.filter( (itemTotvs: any) => productCl == itemTotvs.product.replace(/ /g, ""));//replace para remover o espaços ex do code que vem da api: 1201A084.002           .11H

      if (productExchange.length == 0) return;
      
      listProductExchange.push(productExchange);

    }
  )

  return listProductExchange;

}


//Get de produtos de troca por OrderId
export async function exchangeProduct(ctx: Context, next: () => Promise<any>) {

  const {
    clients: {
      totvsProtheus,
      catalogProductRefer
    },
    vtex: {
      route: { params }
    }
  } = ctx;

  const { 
    orderId, 
    productIds 
  } : any = params;

  // try {

    const {orders} : any = await totvsProtheus.getExchangeProduct(orderId);
    const productIdsArray = productIds.split(",")

    const products = compareProductsForExchange(productIdsArray, orders[0].products);

    console.log({
      products: products[0][0].changeProducts,
      orders
    });

    console.log(JSON.stringify(products, null, 2))

    // //deve retornas as informações dos skus de cada referId passada para troca
    const skuItems : any = await catalogProductRefer.getReferenceId(products[0][0].changeProducts);
    const productName = skuItems[0].NameComplete.split("- tam")[0];
    
    ctx.status = 201
    ctx.body = JSON.stringify({ skuItems, productName })
    ctx.set('cache-control', 'no-cache');  

  // } catch (error) {
  //   ctx.status = 500
  //   ctx.body = JSON.stringify({ "message": "something went wrong", "error": error });
  // }
  

  await next();
}
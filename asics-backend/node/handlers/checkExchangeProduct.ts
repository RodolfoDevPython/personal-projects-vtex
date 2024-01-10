function compareProductsForExchange(referIdClient: any, referIdTotvs: any) {

  console.log({
    referIdClient,
    referIdTotvs
  })

  let listProductExchange : any = [];

  referIdClient.map(
    (referIdCl: any) => {

      console.log({
        referIdCl
      })  


      let productExchange = referIdTotvs.filter( (itemTotvs: any) => referIdCl == itemTotvs.product.replace(/ /g, ""));//replace para remover o espaços ex do code que vem da api: 1201A084.002           .11H

      console.log({
        productExchange
      })

      if (productExchange.length == 0) return;
      
      listProductExchange.push(productExchange)

    }
  )


  return listProductExchange;

}

export async function checkExchangeProduct(ctx: Context, next: () => Promise<any>) {
  
    const {
      clients: {
        totvsProtheus
      },
      vtex : {
          route: {
              params
          }
      }
    } = ctx;
  
    try {
        const { orderId, refId } :any = params;

        console.log({
            refId,
            orderId
        })

        const orders : any = await totvsProtheus.getExchangeProduct(orderId);

        const products = compareProductsForExchange(refId, orders[0].products);
    
        console.log("checkExchangeProduct");
        console.log({
            orders,
            products
        });
    
        // if (
        //   orders.length && 
        //   orders[0].products.length > 0
        // ) {
    
        // caso tenha o produto disponivel para troca manda a solicitação para totvs
        // totvsProtheus.insertExchange(orders.order)
    
        // Após o item ser inserido vamos armazenar essa info no masterdata para caso o usuario tente mandar uma nova solicitação. CASO ISSO NÃO SEJA UM RUN-TIME e também para criamos um retorno para o usuario que dessa forma continuar o fluxo com uma trigger sendo disparada pelo masterdata para um endpointer do middleware
    
        // const products = compareProductsForExchange(changeProducts, orders[0].products[0].changeProducts)
        
        ctx.status = 201
        // ctx.body = JSON.stringify({ orders })
        ctx.body = JSON.stringify({ message: "ok" })
        ctx.set('cache-control', 'no-cache');  
    
        // } else {
    
        //   ctx.status = 404
        //   ctx.body = JSON.stringify({ "message": "Not found product for exchange" })
    
        // }
        
    } catch (error) {
        ctx.status = 401
        ctx.body = JSON.stringify({ message: error.message })
    }
    
    await next();
}
  
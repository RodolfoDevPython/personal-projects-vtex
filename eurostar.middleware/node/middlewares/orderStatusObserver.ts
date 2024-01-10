
export async function orderStatusObserver(
    ctx: any,
    next: () => Promise<any>
  ) {

    if(ctx.body.domain !== 'Marketplace'){
      await next();
    }

    try {

      setTimeout( async () => {
        const {
          orderId,
          sellerOrderId,
          hostname,
          items,
          clientProfileData: {
            document
          },
        } = await ctx.clients.orderClient.getOrderById(ctx.body.orderId);

        let isSpecificationCBD = false;

        //get specification in seller
        for await (const item of items) {
          const { productId } = item;

          const specification = await ctx.clients.specification.getSpecification(productId);  

          specification?.map( (spcItem: any) => { 
          
            if (spcItem?.Value[0] == "CBD") {
              isSpecificationCBD = true
            }
  
          });

        }
        
        if (!isSpecificationCBD) return;
         
        const _where = `&_where=(cpf=${document} AND marketplaceName=${hostname})`
        const { masterdataExternal } = ctx.clients
        
        const resp = await masterdataExternal.getAll(_where);
  
        
        if (resp.length == 0) {
  
          console.log({ error: "provavelmente o cpf foi alterado no MarketPlace e não no Seller. vamos tentar mais uma vez!!!" }); 

          setTimeout( async() => {
            const resp1 = await masterdataExternal.getAll(_where);

            if (resp1.length == 0) {
              console.log({ error: "provavelmente o cpf foi alterado no MarketPlace e não no Seller. foi a ultima tentativa" }); 
            } else {
              await masterdataExternal.updatedUser({
                id: resp1[0].id,
                fields: {
                  marketplaceOrderId: orderId,
                  marketSellerOrderId: sellerOrderId
                }
              });
            }
          }, 5000);
          
        } else {
  
          await masterdataExternal.updatedUser({
            id: resp[0].id,
            fields: {
              marketplaceOrderId: orderId,
              marketSellerOrderId: sellerOrderId
            }
          });
  
        }
  
        await next();
      }, 8500)
     
      
    } catch (error) {
      console.error(error)
    }

}
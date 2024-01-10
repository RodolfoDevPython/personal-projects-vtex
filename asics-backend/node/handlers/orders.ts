export async function getAllOrders(ctx: Context, next: () => Promise<any>) {

  const {
    clients: {
      orders
    },
    vtex: {
      route: { params }
    }
  } = ctx;

  const { email } : any = params;

  console.log({
    email
  })

  const { list } = await orders.getAllOrders(email);

  const ordersList: any = [];

  for await (const objOrder of list) {
    const orderId = objOrder.orderId;
    const { items, creationDate, value }: any = await orders.getOrderById(objOrder.orderId);

    ordersList.push({
      orderId,
      product: items,
      creationDate,
      total: value
    })

  }

  

  // console.log({
  //   items
  // })

  ctx.status = 201
  ctx.body = JSON.stringify(ordersList)
  ctx.set('cache-control', 'no-cache');  
  
  
  await next();
  
}
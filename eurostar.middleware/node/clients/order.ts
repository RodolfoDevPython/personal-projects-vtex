import { ExternalClient, InstanceOptions, IOContext } from '@vtex/api'

export default class VTEXOrders extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(`http://${context.account}.vtexcommercestable.com.br/api`, context, {
      ...(options ?? {}),
      headers: {
        ...(options?.headers ?? {}),
        'Content-Type': 'application/json',
        VtexIdclientAutCookie: context.authToken,
        'X-Vtex-Use-Https': 'true',
      },
    })
  }

  public getOrderById = (orderId: string): Promise<any> => {
    return this.http.get(`/oms/pvt/orders/${orderId}`)
  }
}
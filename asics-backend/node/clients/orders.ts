import { ExternalClient, InstanceOptions, IOContext } from '@vtex/api'

export default class VTEXOrders extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(`http://${context.account}.myvtex.com/`, context, {
      ...options,
      headers: {
        ...(options?.headers ?? {}),
        'Content-Type': 'application/json',
        VtexIdclientAutCookie: context.authToken,
        'X-Vtex-Use-Https': 'true',
      },
    })
  }

  public getAllOrders(email: string) {
    console.log(`/oms/pvt/orders?q=${email}&f_creationDate:[2021-07-01T02:00:00.000Z TO 2021-12-01T01:59:59.999Z]`);
    return this.http.get(`/api/oms/pvt/orders?f_creationDate:[2021-07-01T02:00:00.000Z TO 2021-12-01T01:59:59.999Z]&q=${email}`);
  }

  public getOrderById = (orderId: string): Promise<any> => {
    return this.http.get(`/api/oms/pvt/orders/${orderId}`)
  }

  public addLog = (orderId: string) => {
    return this.http.post(`/oms/pvt/orders/${orderId}/interactions`)
  }
}
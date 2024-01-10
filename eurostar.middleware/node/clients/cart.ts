import { ExternalClient, InstanceOptions, IOContext } from "@vtex/api";

export default class Cart extends ExternalClient {
    constructor(context: IOContext, options?: InstanceOptions) {
      super('http://eurostar.myvtex.com', context, {
        ...options,
        headers: {
          'Content-Type': 'application/json', 
          Accept: 'application/json'
          // "x-vtex-api-appkey": "vtexappkey-colgatedireto-AEABJL",
          // "x-vtex-api-apptoken": "NPTATRSOMARZJNJEPFRXRVTBSYTJXHIOENMYTCHEETJKKTGHTITBQAQRWSIVYJRESCUVALKNXMSYMIQZSMPOOHYEXVCBUMFVCESIZLGIXFDDHSFNCJCMTCQLEQXFIJTK",
        }
      })
    }
    
    public async addCart(query: string, orderFormId: string): Promise<any[]> {

      return this.http.post(`/checkout/cart/add?${query}`, null ,{
        headers: {
          'Cookie': `checkout.vtex.com=__ofid=${orderFormId}`
        }
      });
      
    }

    public async getOrderForm(): Promise<any[]> {

      return this.http.get('/api/checkout/pub/orderForm/')
      
    }

}
import { ExternalClient, InstanceOptions, IOContext } from "@vtex/api";
// import axios from "axios";

export default class TotvsProtheus extends ExternalClient {
    constructor(context: IOContext, options?: InstanceOptions) {
      
      super('http://228bqi-dsv-protheus.totvscloud.com.br/rest', context, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic VEk6QXNpY3NzQDE=',
          'X-VTEX-Use-Https': 'true',
          'X-Vtex-Remote-Port': '8887'
        }
      })
    }
    
    //Buscar produto para troca
    public getExchangeProduct(orderId: string): Promise<any[]> {
      console.log(`/api/asicsChanges/v1/productChange?orderId=${orderId}`); 

      return this.http.get(`/api/asicsChanges/v1/productChange?orderId=${orderId}`);  

    }

    //Inserir solicitação de troca
    public async insertExchange(order: string) {

      return await this.http.post(`/api/asicsChanges/v1/changeRequest/`, {
        body: order,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic VEk6QXNpY3NzIzI='
        }
      });
        
    }

    //Buscar status solicitação de troca"
    public async getStatusExchange(changeId: string): Promise<any[]> {

      return this.http.get(`/changeRequest/?changeId=${changeId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic VEk6QXNpY3NzIzI='
          }
        }
      )
      
    }

}
import { ExternalClient, InstanceOptions, IOContext } from "@vtex/api";

export default class MasterDataExternal extends ExternalClient {
    constructor(context: IOContext, options?: InstanceOptions) {
      super('http://eurostar.myvtex.com', context, {
        ...options,
        headers: {
          'Content-Type': 'application/json', 
          'Accept': 'application/json',
          "x-vtex-api-appkey": "vtexappkey-eurostar-YTOXCP",
          "x-vtex-api-apptoken": "DYHKMHAHNJGSNTJYKZRMHMLELPGAHNBDGDSHFOIZQHQWVLWNDQGHVTUQMCZXBAZAHCLKACSVQRVAVPJZSSWRGTHNIBVCPLXQHQOSAMMBXKRDYTVWTZEIDITOVYBZHQGE",
        }
      })
    }

    public async getAll(_where: string) {
      
      return await this.http.get(`/api/dataentities/SP/search?_fields=email,id,name,cpf,approved,marketplaceName,marketplaceOrderId,used,balance,validAnvisa,refusedMessage,isPatient,validComprovanteResid,validIdentidade,validReceitaMedica,validRepresentanteLegal${_where}`);

    }

    public exists(email: string, marketplaceName: string) {
      
      return this.http.get(`/api/dataentities/SP/search?_fields=email,id&_where=(email=${email} AND marketplaceName=${marketplaceName})`);
    }

    public async createUser(data: any) {

      return await this.http.post(`/api/dataentities/SP/documents`, data);

    }

    public async getDocumentIdByEmail(email: any) {
      return await this.http.get(`/api/dataentities/SP/search?_fields=email,id&_where=email=${email}`);
    }

    public async updatedUser({ id, fields } : any) {
      
      return await this.http.patch(`/api/dataentities/SP/documents/${id}`, fields);
    }
    
}
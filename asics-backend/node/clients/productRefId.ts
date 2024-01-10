import { ExternalClient, InstanceOptions, IOContext } from '@vtex/api'

export default class VTEXProductRefId extends ExternalClient {
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

  public async getReferenceId(RefIds: any = "1201A069.001.8") {

    let array = []; 

    for await (const RefId of RefIds) {
      
      const skuId = await this.http.get(`/api/catalog_system/pvt/sku/stockkeepingunitidbyrefid/${RefId.product.replace(/ /g, "")}`);
      const { NameComplete, ImageUrl }: any = await this.http.get(`/api/catalog_system/pvt/sku/stockkeepingunitbyid/${skuId}`);    

      array.push({
        NameComplete, 
        ImageUrl
      });
      
    }
    
    return array;
    
  }

}
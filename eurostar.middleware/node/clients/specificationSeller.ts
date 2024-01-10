import { ExternalClient, InstanceOptions, IOContext } from '@vtex/api'

export default class VTEXSpecificationSeller extends ExternalClient {
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

    public async getSpecification(productId: string) {
        return await this.http.get(`/catalog_system/pvt/products/${productId}/specification`)
    }
  
}
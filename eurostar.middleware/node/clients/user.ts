import { ExternalClient, InstanceOptions, IOContext } from '@vtex/api'

export default class User extends ExternalClient {

    constructor(context: IOContext, options?: InstanceOptions) {
        super('http://middlewaremasterdata--eurostar.myvtex.com', context, {
            ...options,
            headers: {
                'Content-Type': 'application/json', 
                'Accept': 'application/vnd.vtex.ds.v10+json',
                'REST-Range': 'resources%3D0-10',            
                'x-vtex-api-appkey': "vtexappkey-eurostar-YTOXCP",
                'x-vtex-api-apptoken': "DYHKMHAHNJGSNTJYKZRMHMLELPGAHNBDGDSHFOIZQHQWVLWNDQGHVTUQMCZXBAZAHCLKACSVQRVAVPJZSSWRGTHNIBVCPLXQHQOSAMMBXKRDYTVWTZEIDITOVYBZHQGE",
            }   
        })
    }

    public async exists(email: string) {        
        return this.http.get(`/_v/app/specificField/${email}/email`);
    }

    public async createUser(userData: string) {
        return this.http.post(`/_v/app/subscribemd/`, userData);
    }

    public async getDataAll(email: any) {
        return this.http.get(`/_v/app/specificField/${email}/all`);
    }

    public async getUserApprovedByEmail(email: string) {
        return this.http.get(`/_v/app/specificField/${email}/approved`);
    }

    public async getDocumentIdByEmail(email: any) {
        return this.http.get(`/_v/app/getDocumentId/${email}`);
    }

}

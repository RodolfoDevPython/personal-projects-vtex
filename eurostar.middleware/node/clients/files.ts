import { ExternalClient, InstanceOptions, IOContext } from '@vtex/api'

export default class Files extends ExternalClient {

    constructor(context: IOContext, options?: InstanceOptions) {
        super('http://api.vtex.com', context, {
            ...options,
            headers: {
                "Cache": "false", 
                "Content-Type": "false", 
                "processData": "false"
            }   
        })
    }

    public async sendFile(documentId: any, files: any) {        
        
        return this.http.post(`/eurostar/dataentities/SP/documents/${documentId}/attachments`, files);

    }


}
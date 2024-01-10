import { json } from "co-body";

export async function listenerStatus(ctx: Context, next: () => Promise<any>) {
    
    const {
        clients: {
            masterdata
        },
        req
    } = ctx;


    try {
        const { status, code_reverse } : any = json(req);

        console.log({
            masterdata,
            req
        })

        const data = await masterdata.createDocument({
            dataEntity: "EP",
            fields: {
                status,
                code_reverse
            },
            schema: "mdv2"
        })

        ctx.status = 201
        ctx.body = JSON.stringify({ message: "ok", data })
        ctx.set('cache-control', 'no-cache');  

    
    } catch (error) {
        ctx.status = 201
        ctx.body = JSON.stringify({ message: error?.message })
        ctx.set('cache-control', 'no-cache');  
    }
    
    await next();

}
export async function masterDataExternalController(ctx: Context, next: () => Promise<any>) {
    
    const {
        clients : { masterdataExternal },
        vtex: {
            route: { params }
        }
    } = ctx;

    const { email } : any = params;

    let _where = "";

    if (email != "all") {
        _where = `&_where=email=${email}`
    } else {
        _where = ""
    }

    const resp = await masterdataExternal.getAll(_where);

    ctx.body = JSON.stringify({ resp });    

    await next();

  }
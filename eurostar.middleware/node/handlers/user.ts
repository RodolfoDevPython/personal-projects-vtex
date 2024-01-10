import { json } from "co-body";

export async function insertFormData(ctx: Context, next: () => Promise<any>) {
  
  const {
    clients : { masterdataExternal },
    req
  } = ctx;

  const { 
    email,
    name,
    cpf,
    receitaMedica,
    representanteLegal,
    used,
    validAnvisa,
    balance,  
    compravanteResid,
    docAnvisa,
    identidade,
    isPatient,
    marketplaceName,
    marketplaceOrderId,
  } = await json(req);  

  const fields : any = { 
      email,
      name,
      cpf: cpf.trim().replace(/[^0-9]/g, ""),
      receitaMedica,
      representanteLegal,
      used,
      validAnvisa,
      balance,  
      compravanteResid,
      docAnvisa,
      identidade,
      marketplaceName,
      marketplaceOrderId,
      isPatient
  };

  //veririca se tem campo com vazio
  for (var prop in fields){
    if (fields[prop] == undefined || fields[prop] == "") {
    delete fields[prop];
    }
  }

  const _where = `&_where=(email=${email} AND marketplaceName=${marketplaceName})`;

  const resp = await masterdataExternal.getAll(_where);

  if (resp.length >= 1) {

    const newSubscription = await masterdataExternal.updatedUser({
      id: resp[0].id,
      fields: { ...fields, approved: null }
    });    

    ctx.status = 200
    ctx.body = newSubscription
    ctx.set('cache-control', 'no-cache')    
    
  } else {

    const newUser : any = await masterdataExternal.createUser(fields);  

    ctx.status = 200
    ctx.body = newUser
    ctx.set('cache-control', 'no-cache')    

  }

  await next(); 
}

export async function getData(ctx: Context, next: () => Promise<any>) {
  
  const {
    clients : { user },
    vtex: {
      route: { params }
    }
  } = ctx;

  const { 
    email
  } = params;  

  const resp = await user.getDataAll(email)
  
  ctx.body = resp;
  ctx.set('cache-control', 'no-cache');

  await next(); 

}

export async function getDocumentIdByEmail(ctx: Context, next: () => Promise<any>) {

  const {
    clients : { masterdataExternal },
    vtex: {
      route: { params }
    }
  } = ctx;

  const { 
    email
  } = params;

  const resp = await masterdataExternal.getDocumentIdByEmail(email);

  ctx.body = resp

  await next(); 

}
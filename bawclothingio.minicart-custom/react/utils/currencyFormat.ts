export function CurrencyFormat(value: any)  {

  try {
  
    const price : any = String(value);

    const currency = new Intl.NumberFormat('pr-BR', 
      { 
        style: 'currency', 
        currency: 'BRL',
        minimumFractionDigits: 2
      }).format(price);

    return currency;

  } catch (error) {
    console.log({
      error
    }) 

    return 0;
    
  }

}
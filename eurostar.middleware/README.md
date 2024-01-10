# service-course-template

workspace de teste -> https://backtristar--beightone.myvtex.com/

### Instalação

vtex install eurostar.backend-eurostar@0.x

### Routes

=------------------------------------------------------------------------------------=

##### [ GET ] -> /_v/app/ordersRequest/:email

description: Pega todas as informações da Solicitação de Pedido por Email

response: 

```json
{
  "resp": [
    {
      "email": "rodolfo.carvalho@b8one.com",
      "id": "ea5ef9ce-ea5b-11eb-82ac-12ab0349dd63",
      "name": "Rodolfo",
      "cpf": "16173270773",
      "approved": true,
      "marketplaceName": "beightone",
      "marketplaceOrderId": "1153422247665-01",
      "used": "50",
      "validAnvisa": false,
      "refusedMessage": "Reenviar toda a documentação"
    },
    {
      "email": "rodolfo.carvalho@b8one.com",
      "id": "d4653911-fba5-11eb-82ac-02851e2ce89d",
      "name": "Rodolfo",
      "cpf": "16173270773",
      "approved": true,
      "marketplaceName": "beightone",
      "marketplaceOrderId": "1153422247665-01",
      "used": "50",
      "validAnvisa": false,
      "refusedMessage": "Reenviar toda a documentação"
    }
  ]
}

```

=------------------------------------------------------------------------------------=

##### [ POST ] -> /_v/app/user/

description: Inserir os dados no masterdata da tristar
body: não é preciso passar todos os campos do masterdata somente o necessário.

```json
  {
    "approved": "Boolean",
    "balance": "Varchar 100",
    "compravanteResid": "File",
    "cpf": "Varchar 100",
    "docAnvisa": "File",
    "email": "Varchar 100",
    "identidade": "File",
    "isPatient": "Boolean",
    "marketplaceName": "Varchar 100",
    "marketplaceOrderId": "Varchar 100",
    "name": "Varchar 100",
    "receitaMedica": "File",
    "representanteLegal": "File"
  }
```

link para consulta de todos os campos -> https://eurostar.ds.vtexcrm.com.br/

=------------------------------------------------------------------------------------=

##### [ POST ] -> Para Salvar os Arquivos

```javascript
  import * as $ from 'jquery';

  var formdata = new FormData();
  const file: any = document.querySelector("#file-teste");

  formdata.append('value', file.files[0]);

  $.ajax({
    url: 'https://api.vtex.com/eurostar/dataentities/SP/documents/608876b0-ee29-11eb-82ac-1606a004d031/compravanteResid/attachments',
    type: 'POST',
    data: formdata,
    headers: {

    },
    cache: false,
    contentType: false,
    processData: false,
    beforeSend: function () { },
    success: function (data) { console.log("deu certo"); console.log(data); },
    error: function () { }
  });
``` 
 segue a [doc da vtex](https://developers.vtex.com/vtex-rest-api/reference/attachments-1)
 
=------------------------------------------------------------------------------------=

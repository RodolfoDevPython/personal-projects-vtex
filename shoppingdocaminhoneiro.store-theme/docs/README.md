# B2C Store Theme

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Prerequisites](#prerequisites)
  - [Toolbelt](#toolbelt)
  - [Edition](#edition)
- [Setup](#setup)
  - [Peer Dependencies](#peer-dependencies)
  - [Search](#search)
  - [Reviews and Ratings](#reviews-and-ratings)

<!-- /code_chunk_output -->

## Prerequisites

### Toolbelt

Follow this [Developer Docs Guide](https://developers.vtex.com/vtex-developer-docs/docs/vtex-io-documentation-2-basicsetuptodevelopinvtexio) to setup **Toolbelt** and have access to CLI commands.

### Edition

Follow the steps required to setup `vtex.edition-store@3.x` detailed in this [Developer Docs Guide](https://developers.vtex.com/vtex-developer-docs/docs/vtex-io-documentation-2-prerequesites#implementing-the-correct-edition-app)

## Setup

### Peer Dependencies

Install theme peer dependencies and accept all terms of use/service:

```sh
vtex install \
    vtex.wish-list@1.x \
    vtex.reviews-and-ratings@2.x \
    vtex.quickorder@3.x\
    vtex.location-availability@0.x \
    vtex.shopper-location@0.x \
    vtex.wordpress-integration@2.x
```

### Search

Follow the steps detailed in the section [Implementing the VTEX Intelligent Search](https://developers.vtex.com/vtex-developer-docs/docs/vtex-io-documentation-2-prerequesites#implementing-the-vtex-intelligent-search) of the Prerequisites for Store Framework development guide.

Go to: **STORE SETUP** &rarr; **Search** &rarr; **Integration settings** (`https://{{account}}.myvtex.com/admin/search/integration-settings`) and click "Start Integration"

![Screen Shot 2021-02-18 at 08.31.00](./Screen%20Shot%202021-02-18%20at%2008.31.00.png)

Wait until all the steps are completed.

![Screen Shot 2021-02-18 at 08.32.31](./Screen%20Shot%202021-02-18%20at%2008.32.31.png)

### Reviews and Ratings

Go to **PRODUCTS** &rarr; **Catalog** &rarr; **Reviews** (`https://{{account}}.myvtex.com/admin/reviews-ratings/pending`);

Click "Reviews Settings &rarr;" in the top right conrner.

![Screen Shot 2021-02-25 at 10.12.49](./Screen%20Shot%202021-02-25%20at%2010.12.49.png)

Check "Display stars in product-rating-summary if there are no reviews"

Uncheck "Display total reviews number on product-rating-summary block"

Click "Save"

![Screen Shot 2021-02-18 at 10.15.38](./Screen%20Shot%202021-02-18%20at%2010.15.38.png)

You should see a toast message saing: "Your data was submitted successfully."

![Screen Shot 2021-02-18 at 10.21.00](./Screen%20Shot%202021-02-18%20at%2010.21.00.png)


###  Mutation Message Vtex

Alterar texto do prazo para aprovação do pagamento de 5 dias para 3 dias.

```gql

mutation Save($saveArgs: SaveArgsV2!) {
  saveV2(args: $saveArgs)
}

# QUERY VARIABLES
# {
#   "saveArgs": {
#     "to": "pt-BR",
#     "messages": [
#       {
#         "srcLang": "en-DV",
#         "srcMessage": "store/warnings.payment.approval",
#         "context": "vtex.order-placed@2.x",
#         "targetMessage": "A aprovação do pagamento pode levar de 5 minutos até 3 dias úteis."
#       }
#     ]
#   }
# }
```

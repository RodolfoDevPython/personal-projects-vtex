# B8one Tristar

Tristar

## Índice

- [Uso](#Uso)

## Uso

Este aplicativo utiliza o construtor de loja com a arquitetura de blocos da VTEX.

Para saber mais sobre o Store Builder [clique aqui.](https://help.vtex.com/en/tutorial/understanding-storebuilder-and-stylesbuilder#structuring-and-configuring-our-store-with-object-object)

Para usar este aplicativo, você precisa importar em suas dependências em `manifest.json`.

```json
  "dependencies": {
    "eurostar.modal-doc-eurostar": "0.x"
  }
```

Em seguida, você pode adicionar o bloco ao produto:

```json
  "store.product": {
    "children": [
      "documentation-modal"
    ]
  },
```

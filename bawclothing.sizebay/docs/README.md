# Contexto

App custom [VTEX.IO](https://learn.vtex.com/docs/course-store-block-step01manifest-lang-pt) criada para replicar a funcionalidade existente do provador virtual que está atualmente no CMS do cliente

## Como usar

#### 1 - Instalar a app na workspace / account

```
vtex install 
```

#### 2 - Implementar a interface ( pixel.sizebay ) onde renderiza o componente no bloco do store-theme


```json
{
    "store.product": {
        "children": [
            "responsive-layout.desktop#product-page"    
        ]
    },
    "responsive-layout.desktop#product-page": {
        "children": [
            "pixel.sizebay"
        ]
    }
    
    
}

```
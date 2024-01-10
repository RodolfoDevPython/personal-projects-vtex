# Minicart Custom Blocks

Creation of custom components for baw mini cart. using independent interfaces for better reuse

### interface free-shipping-minicart-baw 



```json
{
    "minicart-base-content": {
        "blocks": ["minicart-empty-state"],
        "children": [
            "free-shipping-minicart-baw"
        ]
    }
}
```

#### Screenshot
![image](https://user-images.githubusercontent.com/50894217/140102371-07f918d6-0e83-459f-944c-add92c44d883.png)


### interface discount-coupon-minicart-baw


```json
{
    "minicart-base-content": {
        "blocks": ["minicart-empty-state"],
        "children": [
            "free-shipping-minicart-baw",
            "discount-coupon-minicart-baw"
        ]
    }
  
}

```
#### Screenshot
![image](https://user-images.githubusercontent.com/50894217/140102480-ecd8664b-e90e-4820-8e65-5ea80e2d8318.png)


### interface cta-minicart-baw
```json
{
    "flex-layout.col#minicart-footer": {
        "children": [
            "minicart-summary",    
            "cta-minicart-baw", 
            "link#keepBuying"
        ]
    },
  
}

```

#### Screenshot
![image](https://user-images.githubusercontent.com/50894217/140102812-c1a55415-7b88-4023-a42c-da2dfb304845.png)

![image](https://user-images.githubusercontent.com/50894217/140102896-a26f9143-b618-4aaf-afa0-16ddb7c5b403.png)


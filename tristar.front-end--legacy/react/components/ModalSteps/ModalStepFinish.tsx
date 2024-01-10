import React, { useState } from 'react'
import { useOrderItems } from '../../hooks/useOrderItems';
import { useProduct } from '../../hooks/useProduct';

import { TristarState, DispatchProps } from '../../interfaces';
import { Button } from '../Button';

interface DocumentationModalStepFormUpload {
  tristarState: TristarState
}

type Props = DocumentationModalStepFormUpload & DispatchProps

const ModalStepFinish = (_: Props) => {

  const { selectedItem, selectedQuantity } = useProduct();

  const { addItem } = useOrderItems()
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    setLoading(true)

    const { sku, sellerId }: any = selectedItem[0]

    await addItem(
      {
        sku,
        quantity: selectedQuantity(),
        sellerId,
      }
    )

    setTimeout(() => {
      setLoading(false);
    }, 1000)

    window.location.replace('/checkout/#/cart')
  }

  return (
    <>
      <div className="modalHead">
        <svg
          width="43"
          height="43"
          viewBox="0 0 43 43"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="21.5" cy="21.5" r="21.5" fill="#0B539E" />
          <circle cx="21.4998" cy="21.4998" r="17.2" fill="#0B539E" />
          <path
            d="M28.7812 17.24L18.6191 26.9755L14 22.5503"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className="modalBody">
        <div className="tc">
          <p className="modalFormTitle">
            Documentação enviada com sucesso!
          </p>

          <p className="modalSubtitle">
            Agora vamos analisar sua documentação e entraremos em contato em até
            48 horas.
          </p>

          <div
            className={`modalFormFullButton modalFormFullButtonGreen`}
          >
            <Button onClick={handleAddToCart} isLoading={loading} disabled={loading} >
              {
                loading ? (
                  <>Finalizando Compra ...</>
                )
                  : (<>Finalizar Compra </>)
              }
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ModalStepFinish
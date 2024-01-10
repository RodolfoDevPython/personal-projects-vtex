import React, { useState } from 'react'
import { Button, Spinner } from 'vtex.styleguide'
import useProduct from 'vtex.product-context/useProduct'
import { OrderItems } from 'vtex.order-items'

import styles from '../../styles.css'
import { TristarState, DispatchProps } from '../../interfaces'

interface DocumentationModalStepFormUpload {
  tristarState: TristarState
}

type Props = DocumentationModalStepFormUpload & DispatchProps

const ModalStepFinish = (_: Props) => {
  const { selectedItem, selectedQuantity } = useProduct()
  const { useOrderItems } = OrderItems
  const { addItem } = useOrderItems()
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    setLoading(true)
    const { itemId, sellers } = selectedItem

    await addItem([
      {
        id: itemId,
        quantity: selectedQuantity,
        seller: sellers[0].sellerId,
      },
    ])

    setTimeout(() => {
      setLoading(false);
    }, 1000)

    window.location.replace('/checkout/#/cart')
  }

  return (
    <>
      <div className={styles.modalHead}>
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

      <div className={styles.modalBody}>
        <div className="tc">
          <p className={styles.modalFormTitle}>
            Documentação enviada com sucesso!
          </p>

          <p className={styles.modalSubtitle}>
            Agora vamos analisar sua documentação e entraremos em contato em até
            48 horas.
          </p>

          <div
            className={`${styles.modalFormFullButton} ${styles.modalFormFullButtonGreen}`}
          >
            <Button onClick={handleAddToCart} disabled={loading} >
              {
                loading ? (
                  <>
                    Finalizando Compra &nbsp;
                    <Spinner color="#fff" size={20} />
                  </>
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

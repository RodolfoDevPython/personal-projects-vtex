import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { Modal } from 'vtex.styleguide'
import useProduct from 'vtex.product-context/useProduct'

import { AplicationState } from '../../state/store'
import { TristarState, DispatchProps } from '../../interfaces'
import * as TristarStateTypes from '../../state/ducks/TristarState'
import styles from '../../styles.css'
import {
  // ModalStep1,
  ModalStep2,
  ModalStepFormLogin,
  ModalStepFormUpload,
  ModalStepFinish,
  ModalStepRegister,
} from '../ModalSteps'

interface DocumentationModalProps {
  tristarState: TristarState
}

type Props = DocumentationModalProps & DispatchProps

const SELLERNAME = 'eurostar';
const SPECIFICATION_FLAG = 'CBD';

const DocumentationModal = (props: Props) => {
  const { selectedItem, product } = useProduct()

  const { tristarState, update } = props
  const [modalOpen, setModalOpen] = useState(false)
  const modalContent = useRef(null)

  const [checkSeller, setCheckSeller] = useState(false)

  const handleModalToggle = () => {
    setModalOpen(!modalOpen)
    update({
      step: 1
    })
  }

  useEffect(() => {

    try {
      const seller =
        selectedItem?.sellers.filter(
          (item: any) => item.sellerId == SELLERNAME
        ) || []

      const specificationCDB = product?.specificationGroups[0]?.specifications?.filter(
        (item: any) => item?.values[0] == SPECIFICATION_FLAG
      ) || false;

      const CSS_HIDDEN = "display: none !important; opacity: 0; max-height: 0px; max-width: 0px;";

      const buyButton: any = document.querySelector(
        '.vtex-add-to-cart-button-0-x-buttonDataContainer'
      )

      if (
        seller.length &&
        product.specificationGroups.length &&
        (specificationCDB.length && specificationCDB.length > 0)
      ) {

        buyButton?.parentNode?.parentNode?.setAttribute("style", CSS_HIDDEN);
        setCheckSeller(true)

      } else {

        buyButton?.parentNode?.parentNode?.setAttribute("style", "");
        setCheckSeller(false);

      }

    } catch (error) {
      console.log({
        error
      })
    }


  }, [selectedItem])

  if (!checkSeller) {
    return <></>
  }

  return (
    <>
      <button className={styles.buttonModalOpen} onClick={handleModalToggle}>
        Comprar
      </button>

      <div
        style={{
          backgroundColor: '#F59096',
          padding: '12px 16px',
          fontWeight: 500,
          marginBottom: "1rem"
        }}
        className="br2 f6 mt4"
      >
        <p className="b ttu">PRODUTO AUTORIZADO ANVISA</p>
        <p className="b ttu">Para a compra deste item é preciso:</p>
        <p>
          - Realizar seu cadastro; <br />
          - Enviar documentação (como receita médica, por ex.)*; <br />
          - Finalizar o pedido. <br />* Documentação sujeita à análise.
        </p>
      </div>

      <div ref={modalContent} className={styles.modalContent} />

      <Modal
        centered
        isOpen={modalOpen}
        onClose={handleModalToggle}
        container={modalContent.current}
      >
        {/* {tristarState.step === 1 && <ModalStep1 {...props} />}
        {tristarState.step === 2 && <ModalStepFormLogin {...props} />}
        {tristarState.step === 3 && <ModalStepFormUpload {...props} />}
        {tristarState.step === 4 && <ModalStepFinish {...props} />}
        {tristarState.step === 5 && <ModalStep2 {...props} />}
        {tristarState.step === 6 && <ModalStepRegister {...props} />} */}

        {tristarState.step === 1 && <ModalStepFormLogin {...props} />}

        {tristarState.step === 3 && <ModalStepFormUpload {...props} />}

        {tristarState.step === 6 && <ModalStepRegister {...props} />}

        {tristarState.step === 4 && <ModalStepFinish {...props} />}

        {tristarState.step === 5 && <ModalStep2 {...props} />}
      </Modal>
    </>
  )
}

const mapStateToProps = (state: AplicationState) => ({
  tristarState: state.TristarState,
})

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(TristarStateTypes.Creators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(DocumentationModal)

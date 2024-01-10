import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

import { AplicationState } from '../../state/store'
import { TristarState, DispatchProps } from '../../interfaces'
import * as TristarStateTypes from '../../state/ducks/TristarState'

import './style.scss';

import { ModalComponent } from '../Modal'
import { useProduct } from '../../hooks/useProduct'

interface DocumentationModalProps {
  tristarState: TristarState
}

type Props = DocumentationModalProps & DispatchProps

const SELLER_TRISTAR = "vtxuul2976";

const DocumentationModal = (props: Props) => {

  const { selectedItem, getSpecification } = useProduct();

  const { tristarState } = props
  const [modalOpen, setModalOpen] = useState(false)
  const modalContent = useRef(null)

  const [checkSeller, setCheckSeller] = useState(false)

  const handleModalToggle = () => {

    setModalOpen(!modalOpen)

  }

  useEffect(() => {

    async function asynchronousData() {
      try {
        const seller =
          selectedItem?.filter(
            (item: any) => item.sellerId == SELLER_TRISTAR
          ) || []

        const specification: any = await getSpecification();

        let isCBD = false

        if (
          specification &&
          specification[0] &&
          specification[0]["Product"] &&
          specification[0]["Product"].length > 0 &&
          specification[0]["Product"]["CBD"]
        ) {
          isCBD = true
        }

        if (seller.length && isCBD) {

          const buyButton: any = document.querySelector('.buy-button.buy-button-ref');

          if (buyButton) {
            buyButton.style = "display: none !important; opacity: 0; height: 0; z-index: 0;"
          }

          setCheckSeller(true);

        }

        return () => seller;
      } catch (error) {
        console.log({
          error
        })
      }
    }

    asynchronousData();

  }, [selectedItem])

  if (!checkSeller) {
    return <></>
  }

  return (
    <div className="doc-modal">
      <button className="buttonModalOpen" onClick={handleModalToggle}>
        COMPRAR
      </button>

      <div
        style={{
          backgroundColor: '#F59096',
          padding: '12px 16px',
          fontWeight: 500,
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

      <div ref={modalContent} />

      <ModalComponent
        isOpen={modalOpen}
        onRequestClose={handleModalToggle}
        tristarState={tristarState}
        statesProps={props}
      />

    </div>
  )
}

const mapStateToProps = (state: AplicationState) => ({
  tristarState: state.TristarState,
})

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(TristarStateTypes.Creators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(DocumentationModal)

import React from 'react'
import { TristarState, DispatchProps } from '../../interfaces'

interface DocumentationModalProps {
  tristarState: TristarState
}

type Props = DocumentationModalProps & DispatchProps

const ModalStep1 = (props: Props) => {
  const { update } = props

  const handleHaveAuthorization = () => {
    update({
      step: 2,
      anvisaAuthorization: true,
    })
  }

  const handleNotAuthorized = () => {
    update({
      step: 5,
      anvisaAuthorization: false,
    })
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
            d="M28.7812 17.48L18.6191 26.9568L14 22.6491"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className="modalBody">
        <div className="tc">
          <p className="modalTitleStep1">
            Crie seu cadastro e envie sua documentação
          </p>

          <p className="modalSubtitle">
            Após criar sua conta e encaminhar seus documentos, faremos uma
            análise e retornaremos sobre o status da sua documentação em até 48h.
          </p>
        </div>

        <div className="flex-l justify-between flex container-cta-mobile">
          <button
            className="modalButton modalButtonBGBlue w-100 mb0-l mr3"
            onClick={handleHaveAuthorization}
          >
            já tenho autorização anvisa
          </button>

          <button
            className="modalButton modalButtonBGWhite w-100 ml3"
            onClick={handleNotAuthorized}
          >
            não tenho autorização
          </button>
        </div>

        <div className="modalBoxAlert">
          <p className="b ttu ma0">Atenção!</p>

          <p>
            Os documentos a serem enviados devem conter as mesmas informações
            que o usuário utiliza para finalizar a compra na loja, como
            endereço, documento de identidade, etc.
          </p>
        </div>
      </div>
    </>
  )
}

export default ModalStep1

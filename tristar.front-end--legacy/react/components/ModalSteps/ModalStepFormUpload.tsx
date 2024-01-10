import React, { useState } from 'react';

import { Button } from '../Button';

import RadioGroup from '@vtex/styleguide/lib/RadioGroup/'
import Spinner from 'react-bootstrap/Spinner';

import $ from 'jquery';

// import styles from '../../styles.css'
import { TristarState, DispatchProps } from '../../interfaces';

interface DocumentationModalStepFormUpload {
  tristarState: TristarState
}

type Props = DocumentationModalStepFormUpload & DispatchProps

const ModalStepFormUpload = (props: Props) => {
  const { update, tristarState } = props
  const {
    clientType,
    anvisaAuthorization,
    userId,
    proofAnvisaAuthorization,
    proofDocument,
    proofDocumentLegalRepresentative,
    proofAddress,
    proofMedicalPrescription,
  } = tristarState

  const [error, setError] = useState(false)
  const [filesError, setFilesError] = useState({
    anvisaAuthorization: false,
    document: false,
    address: false,
    medicalPrescription: false,
    documentLegalRepresentative: false,
  })

  const [filesLoading, setFilesLoading] = useState({
    anvisaAuthorization: false,
    document: false,
    address: false,
    medicalPrescription: false,
    documentLegalRepresentative: false,
  })

  const handleFileUpload = async (event: any, name: string, field: string) => {
    const file = event.target.files[0]

    if (
      file.type !== 'application/pdf'
    ) {
      return window.alert('Formato Inválido. Apenas formatos PDFs são aceitos')
    }

    const formData = new FormData()

    formData.append('value', file)

    setFilesLoading({
      ...filesLoading,
      anvisaAuthorization: name === 'proofAnvisaAuthorization',
      document: name === 'proofDocument',
      address: name === 'proofAddress',
      medicalPrescription: name === 'proofMedicalPrescription',
      documentLegalRepresentative: name === 'proofDocumentLegalRepresentative',
    })

    $.ajax({
      url: `https://api.vtex.com/eurostar/dataentities/SP/documents/${userId}/${field}/attachments`,
      type: 'POST',
      data: formData,
      headers: {},
      cache: false,
      contentType: false,
      processData: false,
      success: () => { },
      error: () => {
        setFilesError({
          ...filesError,
          anvisaAuthorization: name === 'proofAnvisaAuthorization',
          document: name === 'proofDocument',
          address: name === 'proofAddress',
          medicalPrescription: name === 'proofMedicalPrescription',
          documentLegalRepresentative:
            name === 'proofDocumentLegalRepresentative',
        })
      },
      complete: () => {
        setFilesLoading({
          ...filesLoading,
          anvisaAuthorization: false,
          document: false,
          address: false,
          medicalPrescription: false,
          documentLegalRepresentative: false,
        })

        update({
          [name]: file,
        })
      },
    })
  }

  const handleNextStep = () => {
    if (
      (anvisaAuthorization && !proofAnvisaAuthorization?.name) ||
      !proofDocument?.name ||
      (clientType === 'representative' &&
        !proofDocumentLegalRepresentative?.name) ||
      !proofAddress?.name ||
      !proofMedicalPrescription?.name
    ) {
      return setError(true)
    }

    update({
      step: 4,
    })
  }

  return (
    <>
      <div className="modalHead">

        <div className="modalBoxAlert">

          <p className="b ttu ma0">Atenção!</p>

          <p>
            Os documentos a serem enviados devem conter as mesmas informações
            que o usuário utiliza para finalizar a compra na loja, como
            endereço, documento de identidade, etc.
          </p>

        </div>

        <div className="flex ">
          <div className="tc mr6">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="12" fill="#0B539E" />
              <circle cx="11.6" cy="11.6" r="9.6" fill="#0B539E" />
              <path
                d="M16.25 9.69019L10.5781 15.927L8 13.0921"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <p className="modalFormTitleStep">Dados Básicos</p>
          </div>

          <div className="tc ml6">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="12" fill="#0B539E" />
              <path
                d="M15.12 10.48C15.12 8.812 13.896 8.02 12.312 8.02C10.872 8.02 9.48 8.788 9.48 10.408C9.48 10.804 9.552 11.2 9.636 11.392H11.352V11.176C11.304 10.948 11.28 10.696 11.28 10.54C11.28 9.916 11.64 9.508 12.264 9.508C12.936 9.508 13.248 9.904 13.248 10.528C13.248 11.248 13.008 11.692 12.492 12.22C11.58 13.168 10.656 14.008 9.504 14.932V16H15.288V14.404H13.572C13.332 14.404 12.648 14.416 12.408 14.452V14.428C13.62 13.432 15.12 12.184 15.12 10.648V10.48Z"
                fill="white"
              />
            </svg>

            <p className="modalFormTitleStep">Documentação</p>
          </div>
        </div>
      </div>

      <div className="modalBody">
        <div className="tc">
          <p className="modalFormTitle">
            Precisamos de toda a documentação abaixo para fazer o pedido.
          </p>
        </div>

        <div className="modalFormUploadRadioBox">
          <RadioGroup
            hideBorder
            options={[
              { value: 'patient', label: 'Sou paciente' },
              { value: 'representative', label: 'Sou representante legal' },
            ]}
            value={clientType}
            onChange={(event: any) =>
              update({
                clientType: event.currentTarget.value,
              })
            }
          />
        </div>

        <div className="modalFormUpload">
          {anvisaAuthorization && (
            <div className="modalFormUploadTitle">
              Autorização Anvisa
              <label
                className={`modalFormUploadLabel ${proofAnvisaAuthorization?.name &&
                  "modalFormUploadLabelPass"
                  } ${filesError.anvisaAuthorization && "inputUploadError"}`}
              >
                <input
                  style={{ display: 'none' }}
                  type="file"
                  onChange={(event) =>
                    handleFileUpload(
                      event,
                      'proofAnvisaAuthorization',
                      'docAnvisa'
                    )
                  }
                  disabled={filesLoading.anvisaAuthorization}
                />

                {filesLoading.anvisaAuthorization ? (
                  <Spinner animation="border" color="#0B539E" size="sm" />
                ) : (
                  'Autorização de importação Anvisa'
                )}
              </label>
              {filesError.anvisaAuthorization && (
                <span className="t-mini red b mb5">Tente novamente</span>
              )}
            </div>
          )}

          <div className="modalFormUploadTitle">
            Identidade ou CNH do Paciente
            <label
              className={`modalFormUploadLabel ${proofDocument?.name && "modalFormUploadLabelPass"
                } ${filesError.document && "inputUploadError"}`}
            >
              <input
                style={{ display: 'none' }}
                type="file"
                onChange={(event) =>
                  handleFileUpload(event, 'proofDocument', 'identidade')
                }
                disabled={filesLoading.document}
              />

              {filesLoading.document ? (
                <Spinner animation="border" color="#0B539E" size="sm" />
              ) : (
                'Anexar Documento'
              )}
            </label>
            {filesError.document && (
              <span className="t-mini red b mb5">Tente novamente</span>
            )}
          </div>

          {clientType === 'representative' && (
            <div className="modalFormUploadTitle">
              Identidade ou CNH do Repres. Legal
              <label
                className={`modalFormUploadLabel ${proofDocumentLegalRepresentative?.name &&
                  "modalFormUploadLabelPass"
                  } ${filesError.documentLegalRepresentative &&
                  "inputUploadError"
                  }`}
              >
                <input
                  style={{ display: 'none' }}
                  type="file"
                  onChange={(event) =>
                    handleFileUpload(
                      event,
                      'proofDocumentLegalRepresentative',
                      'representanteLegal'
                    )
                  }
                  disabled={filesLoading.documentLegalRepresentative}
                />

                {filesLoading.documentLegalRepresentative ? (
                  <Spinner animation="border" color="#0B539E" size="sm" />
                ) : (
                  'Anexar doc. representante legal'
                )}
              </label>
              {filesError.documentLegalRepresentative && (
                <span className="t-mini red b mb5">Tente novamente</span>
              )}
            </div>
          )}

          <div className="modalFormUploadTitle" >
            Comprovante de Residência
            <label
              className={`modalFormUploadLabel ${proofAddress?.name && "modalFormUploadLabelPass"
                } ${filesError.address && "inputUploadError"}`}
            >
              <input
                style={{ display: 'none' }}
                type="file"
                onChange={(event) =>
                  handleFileUpload(event, 'proofAddress', 'compravanteResid')
                }
                disabled={filesLoading.address}
              />

              {filesLoading.address ? (
                <Spinner animation="border" color="#0B539E" size="sm" />
              ) : (
                'Comprovante de Residência'
              )}
            </label>
            {filesError.address && (
              <span className="t-mini red b mb5">Tente novamente</span>
            )}
          </div>

          <div className="modalFormUploadTitle">
            Receita Médica
            <label
              className={`modalFormUploadLabel ${proofMedicalPrescription?.name &&
                "modalFormUploadLabelPass"
                }  ${filesError.medicalPrescription && "inputUploadError"}`}
            >
              <input
                style={{ display: 'none' }}
                type="file"
                onChange={(event) =>
                  handleFileUpload(
                    event,
                    'proofMedicalPrescription',
                    'receitaMedica'
                  )
                }
                disabled={filesLoading.medicalPrescription}
              />

              {filesLoading.medicalPrescription ? (
                <Spinner animation="border" color="#0B539E" size="sm" />
              ) : (
                'Anexar receita médica'
              )}
            </label>
            {filesError.medicalPrescription && (
              <span className="t-mini red b mb5">Tente novamente</span>
            )}
          </div>
        </div>

        <div className={`modalForm`}>
          <div
            className={`modalFormFullButton ${error && "modalFormFullButtonRed"
              }`}
          >

            <Button onClick={handleNextStep}>Avançar</Button>

          </div>

          {error && (
            <div className="red mt3 tc f7 fw6">Anexe todos os documentos.</div>
          )}
        </div>
      </div>
    </>
  )
}

export default ModalStepFormUpload
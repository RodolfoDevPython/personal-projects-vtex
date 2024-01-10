import React, { useState } from 'react'

import ProgressBar from 'react-bootstrap/ProgressBar';
import Spinner from 'react-bootstrap/Spinner';

import $ from 'jquery'

import { TristarState, DispatchProps } from '../../interfaces'
import { Button } from '../Button'


interface DocumentationModalStepFormUpload {
  tristarState: TristarState
}

type Props = DocumentationModalStepFormUpload & DispatchProps

const ModalStepRegister = (props: Props) => {
  const { update, tristarState } = props
  const {
    name,
    clientType,
    anvisaAuthorization,
    consumption,
    approved,
    validAnvisaAuthorization,
    validDocument,
    validAddress,
    validMedicalPrescription,
    validDocumentLegalRepresentative,
    proofAnvisaAuthorization,
    proofDocument,
    proofDocumentLegalRepresentative,
    proofAddress,
    proofMedicalPrescription,
    userId,
    refusedMessage,
    balance,
  } = tristarState;

  const consumptionDefault = Number(balance);

  const percentConsumption = Number(
    (100 * Number(consumption)) / consumptionDefault
  );

  const [filesError, setFilesError] = useState({
    anvisaAuthorization: false,
    document: false,
    address: false,
    medicalPrescription: !validMedicalPrescription,
    documentLegalRepresentative: false,
  })

  const [filesLoading, setFilesLoading] = useState({
    anvisaAuthorization: false,
    document: false,
    address: false,
    medicalPrescription: false,
    documentLegalRepresentative: false,
  })

  const [error, setError] = useState(false)

  const handleFileUpload = async (
    event: any,
    nameField: string,
    field: string
  ) => {
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
      anvisaAuthorization: nameField === 'proofAnvisaAuthorization',
      document: nameField === 'proofDocument',
      address: nameField === 'proofAddress',
      medicalPrescription: nameField === 'proofMedicalPrescription',
      documentLegalRepresentative:
        nameField === 'proofDocumentLegalRepresentative',
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
          anvisaAuthorization: nameField === 'proofAnvisaAuthorization',
          document: nameField === 'proofDocument',
          address: nameField === 'proofAddress',
          medicalPrescription: nameField === 'proofMedicalPrescription',
          documentLegalRepresentative:
            nameField === 'proofDocumentLegalRepresentative',
        })
      },
      complete: () => {
        setFilesError({
          ...filesError,
          anvisaAuthorization: nameField === 'proofAnvisaAuthorization' ? false : filesError.anvisaAuthorization,
          document: nameField === 'proofDocument' ? false : filesError.document,
          address: nameField === 'proofAddress' ? false : filesError.address,
          medicalPrescription: nameField === 'proofMedicalPrescription' ? (!filesError.medicalPrescription) : false,
          documentLegalRepresentative:
            nameField === 'proofDocumentLegalRepresentative' ? false : filesError.documentLegalRepresentative,
        })
        setFilesLoading({
          ...filesLoading,
          anvisaAuthorization: false,
          document: false,
          address: false,
          medicalPrescription: false,
          documentLegalRepresentative: false,
        })

        update({
          [nameField]: file,
        })
      },
    })
  }

  const checkIcon = (valid: boolean | null) => {
    if (valid === null || approved == null) {
      return "modalFormUploadCheckPedding"
    }

    if (!valid) {
      return "modalFormUploadCheckFalse"
    }

    return "modalFormUploadCheckTrue"
  }

  const handleNextStep = () => {

    if (
      (anvisaAuthorization && validAnvisaAuthorization == false && !proofAnvisaAuthorization?.name) ||
      (!validDocument && !proofDocument?.name) ||
      (!validDocumentLegalRepresentative &&
        clientType === 'representative' &&
        !proofDocumentLegalRepresentative?.name) ||
      (!validAddress && !proofAddress?.name) ||
      (!validMedicalPrescription && filesError.medicalPrescription) //verificação de receita não aprovada
    ) {

      return setError(true)
    }

    //verificação de receita aprovada mas estourou o limite
    if (
      (Number(consumption) >= consumptionDefault) && (validMedicalPrescription && !filesError.medicalPrescription)
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
          <p className="modalFormTitle b">
            Olá <span className="modalFormTitleBlue">{name}.</span>
          </p>
        </div>

        <div className="modalFormUpload">
          {anvisaAuthorization && (
            <div className="modalFormUploadTitle">
              <div
                className={`modalFormUploadCheckLabel ${checkIcon(
                  validAnvisaAuthorization
                )}`}
              >
                Autorização de importação Anvisa
              </div>
            </div>
          )}

          <div className="modalFormUploadTitle">
            <div
              className={`modalFormUploadCheckLabel ${checkIcon(
                validDocument
              )}`}
            >
              Identidade ou CNH
            </div>
          </div>

          {clientType === 'representative' && (
            <div className="modalFormUploadTitle">
              <div
                className={`modalFormUploadCheckLabel ${checkIcon(
                  validDocumentLegalRepresentative
                )}`}
              >
                Anexar doc. representante legal
              </div>
            </div>
          )}

          <div className="modalFormUploadTitle">
            <div
              className={`modalFormUploadCheckLabel ${checkIcon(
                validAddress
              )}`}
            >
              Comprovante de Residência
            </div>
          </div>

          <div className="modalFormUploadTitle">
            <div
              className={`modalFormUploadCheckLabel ${checkIcon(
                validMedicalPrescription
              )} ${approved != null && Number(consumption) >= consumptionDefault &&
              "modalFormUploadCheckFalse" && !validMedicalPrescription
                }`}
            >
              Receita Médica
            </div>
          </div>
        </div>

        {approved != null ? (
          <>
            <div className="tc">
              {!approved && refusedMessage?.length ? (
                <p className="tc red b t-mini mt0 mb6">{refusedMessage}</p>
              ) : (
                ''
              )}

              <p className="modalFormConsumptionTitle">
                O seu limite de consumo é de:
              </p>

              <p className="modalFormConsumptionValue">
                {consumptionDefault}ml
              </p>

              <div
                className={`modalFormConsumptionLine ${Number(consumption) >= consumptionDefault &&
                  "modalFormConsumptionLineError"
                  }`}
              >
                <ProgressBar
                  variant="info"
                  now={!percentConsumption ? 0 : percentConsumption}
                  label={`${!percentConsumption ? 0 : percentConsumption}%`}
                />
              </div>

              <div className="modalFormConsumptionValues flex">
                <p
                  className={`modalFormConsumptionValueBlue ${Number(consumption) >= consumptionDefault &&
                    "modalFormConsumptionValueRed"
                    }`}
                >
                  Você já comprou: {consumption}ml
                </p>

                <p className="modalFormConsumptionValueRed">
                  Restam: {consumptionDefault - Number(consumption)}ml
                </p>
              </div>
            </div>
            {
              approved != true ? (
                <div className="modalFormUploadNewPrescription">
                  {
                    <div className="modalFormUploadTitle">
                      Receita Médica
                      <label
                        className={`modalFormUploadLabel ${proofMedicalPrescription?.name &&
                          "modalFormUploadLabelPass"
                          }  ${filesError.medicalPrescription && "inputUploadError"
                          }`}
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
                          'anexar uma nova receita médica'
                          // ((Number(consumption) >= consumptionDefault && filesError.medicalPrescription) || !validMedicalPrescription) ?
                          //   ('Anexar Nova receita médica')
                          //   :
                          //   ('Anexar receita médica')

                        )}
                      </label>
                      {filesError.medicalPrescription && (
                        <span className="t-mini red b mb5">Tente novamente</span>
                      )}
                    </div>
                  }

                  {(
                    (!validAnvisaAuthorization && anvisaAuthorization)
                  ) && (
                      <div className="modalFormUploadTitle">
                        Autorização Anvisa
                        <label
                          className={`modalFormUploadLabel ${proofAnvisaAuthorization?.name &&
                            "modalFormUploadLabelPass"
                            } ${filesError.anvisaAuthorization && "inputUploadError"
                            }`}
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

                  {!validDocument && (
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
                  )}

                  {!validDocumentLegalRepresentative &&
                    clientType === 'representative' && (
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

                  {!validAddress && (
                    <div className="modalFormUploadTitle">
                      Comprovante de Residência
                      <label
                        className={`modalFormUploadLabel ${proofAddress?.name && "modalFormUploadLabelPass"
                          } ${filesError.address && "inputUploadError"} `}
                      >
                        <input
                          style={{ display: 'none' }}
                          type="file"
                          onChange={(event) =>
                            handleFileUpload(
                              event,
                              'proofAddress',
                              'compravanteResid'
                            )
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
                  )}
                </div>
              ) :
                (
                  <div className="modalFormUploadNewPrescription">

                    <div className="modalFormUploadTitle">
                      Receita Médica
                      <label
                        className={`modalFormUploadLabel ${proofMedicalPrescription?.name &&
                          "modalFormUploadLabelPass"
                          } ${filesError.medicalPrescription && "inputUploadError"
                          }`}
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
                        ) :
                          (
                            "anexar uma nova receita médica"
                          )
                          // ((Number(consumption) >= consumptionDefault) && (filesError.medicalPrescription)) ?
                          //   ('Anexar Nova receita médica')
                          //   :
                          //   ('Anexar receita médica')
                        }
                      </label>
                      {filesError.medicalPrescription && (
                        <span className="t-mini red b mb5">Tente novamente</span>
                      )}
                    </div>


                    {(
                      (
                        (!validAnvisaAuthorization && anvisaAuthorization)
                      )
                    ) && (
                        <div className="modalFormUploadTitle">
                          Autorização Anvisa
                          <label
                            className={`modalFormUploadLabel ${proofAnvisaAuthorization?.name &&
                              "modalFormUploadLabelPass"
                              } ${filesError.anvisaAuthorization && "inputUploadError"
                              }`}
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

                    <br />

                  </div>
                )
            }

            <div
              className={`modalFormFullButton ${error && "modalFormFullButtonRed"
                }`}
            >
              <Button onClick={handleNextStep}>Avançar</Button>
            </div>

            {error && (
              <div className="red mt3 tc f7 fw6">
                Anexe todos os documentos.
              </div>
            )}
          </>
        ) : (
          <p className="tc">A sua documentação está em analise.</p>
        )}
      </div>
    </>
  )
}

export default ModalStepRegister
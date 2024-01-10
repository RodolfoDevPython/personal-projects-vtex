import React, { useState } from 'react'
import { Progress, Button, Spinner } from 'vtex.styleguide'
import $ from 'jquery'

import styles from '../../styles.css'
import { TristarState, DispatchProps } from '../../interfaces'

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

  const consumptionDefault = Number(balance)

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
      return styles.modalFormUploadCheckPedding
    }

    if (!valid) {
      return styles.modalFormUploadCheckFalse
    }

    return styles.modalFormUploadCheckTrue
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
      <div className={styles.modalHead}>

        <div className={`${styles.modalBoxAlert} mb6 ml5 mr5`}>

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

            <p className={styles.modalFormTitleStep}>Dados Básicos</p>
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

            <p className={styles.modalFormTitleStep}>Documentação</p>
          </div>
        </div>
      </div>

      <div className={styles.modalBody}>
        <div className="tc">
          <p className={`${styles.modalFormTitle} b`}>
            Olá <span className={styles.modalFormTitleBlue}>{name}.</span>
          </p>
        </div>

        <div className={styles.modalFormUpload}>
          {anvisaAuthorization && (
            <div className={styles.modalFormUploadTitle}>
              <div
                className={`${styles.modalFormUploadCheckLabel} ${checkIcon(
                  validAnvisaAuthorization
                )}`}
              >
                Autorização de importação Anvisa
              </div>
            </div>
          )}

          <div className={styles.modalFormUploadTitle}>
            <div
              className={`${styles.modalFormUploadCheckLabel} ${checkIcon(
                validDocument
              )}`}
            >
              Identidade ou CNH
            </div>
          </div>

          {clientType === 'representative' && (
            <div className={styles.modalFormUploadTitle}>
              <div
                className={`${styles.modalFormUploadCheckLabel} ${checkIcon(
                  validDocumentLegalRepresentative
                )}`}
              >
                Anexar doc. representante legal
              </div>
            </div>
          )}

          <div className={styles.modalFormUploadTitle}>
            <div
              className={`${styles.modalFormUploadCheckLabel} ${checkIcon(
                validAddress
              )}`}
            >
              Comprovante de Residência
            </div>
          </div>

          <div className={styles.modalFormUploadTitle}>
            <div
              className={`${styles.modalFormUploadCheckLabel} ${checkIcon(
                validMedicalPrescription
              )} ${approved != null && Number(consumption) >= consumptionDefault &&
              styles.modalFormUploadCheckFalse && !validMedicalPrescription
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

              <p className={`${styles.modalFormConsumptionTitle}`}>
                O seu limite de consumo é de:
              </p>

              <p className={`${styles.modalFormConsumptionValue}`}>
                {consumptionDefault}ml
              </p>

              <div
                className={`${styles.modalFormConsumptionLine} ${Number(consumption) >= consumptionDefault &&
                  styles.modalFormConsumptionLineError
                  }`}
              >
                <Progress
                  type="line"
                  percent={Number(
                    (100 * Number(consumption)) / consumptionDefault
                  )}
                />
              </div>

              <div className={`${styles.modalFormConsumptionValues} flex`}>
                <p
                  className={`${styles.modalFormConsumptionValueBlue} ${Number(consumption) >= consumptionDefault &&
                    styles.modalFormConsumptionValueRed
                    }`}
                >
                  Você já comprou: {consumption}ml
                </p>

                <p className={styles.modalFormConsumptionValueRed}>
                  Restam: {consumptionDefault - Number(consumption)}ml
                </p>
              </div>
            </div>
            {
              approved != true ? (
                <div className={styles.modalFormUploadNewPrescription}>
                  {
                    <div className={styles.modalFormUploadTitle}>
                      Receita Médica
                      <label
                        className={`${styles.modalFormUploadLabel} ${proofMedicalPrescription?.name &&
                          styles.modalFormUploadLabelPass
                          }  ${filesError.medicalPrescription && styles.inputUploadError
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
                          <Spinner color="#0B539E" size={20} />
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
                      <div className={styles.modalFormUploadTitle}>
                        Autorização Anvisa
                        <label
                          className={`${styles.modalFormUploadLabel} ${proofAnvisaAuthorization?.name &&
                            styles.modalFormUploadLabelPass
                            } ${filesError.anvisaAuthorization && styles.inputUploadError
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
                            <Spinner color="#0B539E" size={20} />
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
                    <div className={styles.modalFormUploadTitle}>
                      Identidade ou CNH do Paciente
                      <label
                        className={`${styles.modalFormUploadLabel} ${proofDocument?.name && styles.modalFormUploadLabelPass
                          } ${filesError.document && styles.inputUploadError}`}
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
                          <Spinner color="#0B539E" size={20} />
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
                      <div className={styles.modalFormUploadTitle}>
                        Identidade ou CNH do Repres. Legal
                        <label
                          className={`${styles.modalFormUploadLabel} ${proofDocumentLegalRepresentative?.name &&
                            styles.modalFormUploadLabelPass
                            } ${filesError.documentLegalRepresentative &&
                            styles.inputUploadError
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
                            <Spinner color="#0B539E" size={20} />
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
                    <div className={styles.modalFormUploadTitle}>
                      Comprovante de Residência
                      <label
                        className={`${styles.modalFormUploadLabel} ${proofAddress?.name && styles.modalFormUploadLabelPass
                          } ${filesError.address && styles.inputUploadError}`}
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
                          <Spinner color="#0B539E" size={20} />
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
                  <div className={styles.modalFormUploadNewPrescription}>

                    <div className={styles.modalFormUploadTitle}>
                      Receita Médica
                      <label
                        className={`${styles.modalFormUploadLabel} ${proofMedicalPrescription?.name &&
                          styles.modalFormUploadLabelPass
                          }  ${filesError.medicalPrescription && styles.inputUploadError
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
                          <Spinner color="#0B539E" size={20} />
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
                        <div className={styles.modalFormUploadTitle}>
                          Autorização Anvisa
                          <label
                            className={`${styles.modalFormUploadLabel} ${proofAnvisaAuthorization?.name &&
                              styles.modalFormUploadLabelPass
                              } ${filesError.anvisaAuthorization && styles.inputUploadError
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
                              <Spinner color="#0B539E" size={20} />
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
              className={`${styles.modalFormFullButton} ${error && styles.modalFormFullButtonRed
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

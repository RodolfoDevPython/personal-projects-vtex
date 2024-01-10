import React, { useState } from 'react'
import { Input, Button } from 'vtex.styleguide'
import InputMask from 'react-input-mask'
import { useRuntime } from 'vtex.render-runtime'

import styles from '../../styles.css'
import { TristarState, DispatchProps } from '../../interfaces'

interface DocumentationModalStepFormLogin {
  tristarState: TristarState
}

type Props = DocumentationModalStepFormLogin & DispatchProps

const ModalStepFormLogin = (props: Props) => {
  const { account } = useRuntime()

  const {
    tristarState: { name, document, email, anvisaAuthorization },
    update,
  } = props

  const [checkName, setCheckName] = useState(false)
  const [checkDocument, setCheckDocument] = useState(false)
  const [checkEmail, setCheckEmail] = useState(false)
  const [loadingSendForm, setLoadingSendForm] = useState(false)

  const validateEmail = (emailCheck: string) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    return re.test(emailCheck)
  }

  const validateForm = () => {
    let result = true

    if (name.length) {
      setCheckName(false)
    } else {
      setCheckName(true)
      result = false
    }

    if (document.length) {
      setCheckDocument(false)
    } else {
      result = false
      setCheckDocument(true)
    }

    if (email.length && validateEmail(email)) {
      setCheckEmail(false)
    } else {
      result = false
      setCheckEmail(true)
    }

    return result
  }

  const saveNewUser = async () => {
    const sendUser = await fetch('/_v/app/user/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        cpf: document,
        name,
        marketplaceName: account,
      }),
    })

    const sendUserData = await sendUser.json()

    if (sendUser.status === 200) {
      update({
        step: 3,
        userId: sendUserData.DocumentId,
      })
    }
  }

  const handleFormValidate = () => {
    if (validateForm()) {
      setLoadingSendForm(true)

      fetch(`/_v/app/ordersRequest/${email}`)
        .then((response) => response.json())
        .then((response) => {
          if (response.resp.length) {

            saveNewUser()
            update({
              step: 6,
              register: true,
              userId: response.resp[0].id,
              email: response.resp[0].email,
              name: response.resp[0].name,
              document: response.resp[0].cpf,
              consumption: response.resp[0].used,
              balance: response.resp[0].balance,
              approved: response.resp[0].approved,
              clientType: response.resp[0].isPatient
                ? 'patient'
                : 'representative',
              validAnvisaAuthorization: response.resp[0].validAnvisa,
              validDocument: response.resp[0].validIdentidade,
              validAddress: response.resp[0].validComprovanteResid,
              validMedicalPrescription: response.resp[0].validReceitaMedica,
              validDocumentLegalRepresentative:
                response.resp[0].validRepresentanteLegal,
              refusedMessage: response.resp[0].refusedMessage,
            })
          } else {
            setLoadingSendForm(true)
            saveNewUser()
          }
        })
        .catch(console.error)
        .finally(() => {
          setLoadingSendForm(false)
        })
    }
  }

  const handleNotAuthorized = (event: React.FormEvent) => {

    event.preventDefault();

    update({
      step: 5,
      anvisaAuthorization: false,
    })

  }

  return (
    <>
      <div className={styles.modalHead}>
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
          <p className={styles.modalFormTitle}>
            Preencha os dados abaixo para validar seu cadastro.
          </p>
        </div>

        <div className={`${styles.modalForm}`}>
          <div className={`flex-l w-100 ${styles.modalForm2Input}`}>
            <Input
              label="Nome Completo"
              value={name}
              onChange={(event: any) => {
                if (event.target.value.length) {
                  setCheckName(false)
                }

                update({
                  name: event.target.value,
                })
              }}
              error={checkName}
              errorMessage=""
            />

            <div className={`vtex-input w-100 ${styles.modalForm2InputCPF}`}>
              <span className="vtex-input__label db mb3 w-100 c-on-base t-small ">
                CPF
              </span>

              <div className="vtex-input-prefix__group flex flex-row items-stretch overflow-hidden br2 bw1 b--solid b--muted-4 hover-b--muted-3 h-regular ">
                <InputMask
                  mask="999.999.999-99"
                  maskChar={null}
                  value={document}
                  onChange={(event: any) => {
                    if (event.target.value.length) {
                      setCheckDocument(false)
                    }

                    update({
                      document: event.target.value,
                    })
                  }}
                >
                  {() => (
                    <input
                      className={`vtex-styleguide-9-x-input ma0 border-box vtex-styleguide-9-x-hideDecorators vtex-styleguide-9-x-noAppearance br2   w-100 bn outline-0 bg-base c-on-base b--muted-4 hover-b--muted-3 t-body ph5 ${checkDocument ? 'error' : ''
                        }`}
                      type="text"
                    />
                  )}
                </InputMask>
              </div>
            </div>
          </div>

          <div className="flex w-100">
            <Input
              label="E-mail"
              value={email}
              onChange={(event: any) => {
                update({
                  email: event.target.value,
                })

                if (event.target.value) {
                  setCheckEmail(false)
                }
              }}
              error={checkEmail}
              errorMessage=""
            />
          </div>

          <div className={styles.modalFormFullButton}>
            <Button isLoading={loadingSendForm} onClick={handleFormValidate}>
              Avançar
            </Button>
          </div>

          {
            anvisaAuthorization &&
            (
              <div className="flex w-100">
                <a
                  onClick={handleNotAuthorized}
                  className={styles.modalFormRedirectNotAuthorized}
                >Se você ainda não possui Autorização da Anvisa clique aqui para saber como importar este produto.</a>
              </div>
            )
          }

        </div>
      </div>
    </>
  )
}

export default ModalStepFormLogin

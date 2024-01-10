import React, { useState } from 'react'
import { Button, Collapsible } from 'vtex.styleguide'

import styles from '../../styles.css'
import { TristarState, DispatchProps } from '../../interfaces'

interface ModalStep2Props {
  tristarState: TristarState
}

type Props = ModalStep2Props & DispatchProps

const ModalStep2 = (props: Props) => {
  const [collapsibleOpen, setCollapsibleOpen] = useState({
    collapsibleOpen1: false,
    collapsibleOpen2: false,
    collapsibleOpen3: false,
    collapsibleOpen4: false,
    collapsibleOpen5: false,
    collapsibleOpen6: false,
    collapsibleOpen7: false,
  })

  const { update } = props

  const handleNextStep = () => {
    update({
      step: 1,
    })
  }

  return (
    <>
      <div className={`${styles.modalHead} ${styles.modalHeadCollapsible}`}>
        <svg
          width="43"
          height="43"
          viewBox="0 0 43 43"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="21.5" cy="21.5" r="21.5" fill="white" />
          <circle cx="21.2" cy="21.2" r="17.2" fill="white" />
          <path
            d="M18.7812 27.6016C18.3125 27.6016 18 27.9531 18 28.3828V30.2188C18 30.6875 18.3125 31 18.7812 31H24.7188C25.1484 31 25.5 30.6875 25.5 30.2188V28.3828C25.5 27.9531 25.1484 27.6016 24.7188 27.6016H23.9375V19.2812C23.9375 18.8516 23.5859 18.5 23.1562 18.5H18.7812C18.3125 18.5 18 18.8516 18 19.2812V21.1562C18 21.5859 18.3125 21.9375 18.7812 21.9375H19.5625V27.6016H18.7812ZM21.75 11C20.1875 11 18.9375 12.2891 18.9375 13.8125C18.9375 15.375 20.1875 16.625 21.75 16.625C23.2734 16.625 24.5625 15.375 24.5625 13.8125C24.5625 12.2891 23.2734 11 21.75 11Z"
            fill="#EA212C"
          />
        </svg>

        <p className="tc mt6">
          A Anvisa pode autorizar a importação de produtos derivados de Cannabis
          para tratamento de saúde.
        </p>

        <p className="tc ma0">
          A autorização permite que pessoas físicas ou seus representantes
          legais importem o produto por um período de dois anos, desde que haja
          prescrição médica.
        </p>
      </div>

      <div className={`${styles.modalBody} ${styles.modalBodyCollapsible}`}>
        <div className="tc">
          <p className={styles.modalTitleStep1}>
            Passo a passo para a importação do produto
          </p>

          <Collapsible
            header={
              <div className={styles.modalCollapsibleTitleContent}>
                <span>
                  1.
                  <span className={styles.modalCollapsibleTitle}>
                    Consulta Médica e Prescrição
                  </span>
                </span>
              </div>
            }
            onClick={(event: any) =>
              setCollapsibleOpen({
                ...collapsibleOpen,
                collapsibleOpen1: event.target.isOpen,
              })
            }
            align="right"
            isOpen={collapsibleOpen.collapsibleOpen1}
          >
            <div className={styles.modalCollapsibleContent}>
              <p className="mt0">
                A receita deve ser legível (leitura fácil e nítida) e conter
                obrigatoriamente:
              </p>

              <p>
                - Identificação do usuário: nome e endereço completo do
                paciente.
              </p>

              <p>
                - Nome comercial do produto (Medix CBD Oil - 500MG, por ex.)
                <br />
                *Não são nomes comerciais: Canabidiol, CBD, Hemp Oil, Extrato de
                Cannabis, óleo de CBD etc.;
              </p>

              <p>
                - Posologia, ou seja, a dose diária do medicamento,
                especificando a unidade, como gramas, miligramas, mililitros,
                gotas, cápsulas, centímetros;
              </p>

              <p>
                - A data, assinatura e número do registro no Conselho de Classe
                do médico (como CRM, por ex.).
              </p>
            </div>
          </Collapsible>

          <Collapsible
            header={
              <div className={styles.modalCollapsibleTitleContent}>
                <span>
                  2.
                  <span className={styles.modalCollapsibleTitle}>
                    Cadastramento do Paciente na ANVISA
                  </span>
                </span>
              </div>
            }
            onClick={(event: any) =>
              setCollapsibleOpen({
                ...collapsibleOpen,
                collapsibleOpen2: event.target.isOpen,
              })
            }
            align="right"
            isOpen={collapsibleOpen.collapsibleOpen2}
          >
            <div className={styles.modalCollapsibleContent}>
              <p className="mt0">
                O cadastramento do paciente na Anvisa é realizado no Portal do
                Governo Federal, onde deve ser preenchido o formulário de
                solicitação (com informações como paciente, responsável legal,
                prescritor e produto) e anexados os documentos (documento de
                identificação, comprovante de vínculo e receita médica).
              </p>

              <p>
                <strong className={styles.modalCollapsibleContentTextBlue}>
                  Criar uma conta no link:
                </strong>{' '}
                <a
                  href="https://sso.acesso.gov.br/login"
                  target="_blank"
                  rel="noreferrer"
                >
                  https://sso.acesso.gov.br/login
                </a>
              </p>

              <p>
                <strong className={styles.modalCollapsibleContentTextBlue}>
                  Fazer o cadastro
                </strong>
              </p>

              <p>
                Vídeo detalhando a solicitação de autorização:
                <br />
                <strong className={styles.modalCollapsibleContentTextBlue}>
                  https://www.youtube.com/watch?v=bvmhOtbBmPI&feature=emb_logo
                </strong>
              </p>
            </div>
          </Collapsible>

          <Collapsible
            header={
              <div className={styles.modalCollapsibleTitleContent}>
                <span>
                  3.
                  <span className={styles.modalCollapsibleTitle}>
                    Análise do pedido pela ANVISA
                  </span>
                </span>
              </div>
            }
            onClick={(event: any) =>
              setCollapsibleOpen({
                ...collapsibleOpen,
                collapsibleOpen3: event.target.isOpen,
              })
            }
            align="right"
            isOpen={collapsibleOpen.collapsibleOpen3}
          >
            <div className={styles.modalCollapsibleContent}>
              <p className="mt0">
                Na própria página do portal do Governo, basta acessar sua conta
                que será possível consultar suas solicitações anteriores e
                verificar o status da análise do processo atual.
              </p>

              <p>
                Se tiver alguma pendência, estará sinalizada ao final da página.
              </p>

              <p>
                Basta corrigir ou anexar o documento solicitado na própria
                página e clicar em “Pendências Resolvidas”.
              </p>
            </div>
          </Collapsible>

          <Collapsible
            header={
              <div className={styles.modalCollapsibleTitleContent}>
                <span>
                  4.
                  <span className={styles.modalCollapsibleTitle}>
                    Autorização para Importação da ANVISA
                  </span>
                </span>
              </div>
            }
            onClick={(event: any) =>
              setCollapsibleOpen({
                ...collapsibleOpen,
                collapsibleOpen4: event.target.isOpen,
              })
            }
            align="right"
            isOpen={collapsibleOpen.collapsibleOpen4}
          >
            <div className={styles.modalCollapsibleContent}>
              <p className="mt0">
                Após a análise de pedido, a Anvisa emite uma autorização para
                importação excepcional de produtos à base de canabidiol.
              </p>

              <p>
                Após a conclusão da análise a autorização fica disponível no
                próprio Portal do Governo para o paciente acessar com o seu
                login.
                <br />
                Um e-mail automático é enviado comunicando que a análise foi
                concluída e a autorização está pronta.
              </p>

              <p>
                A autorização deve ser mantida junto ao produto, sempre que em
                trânsito, dentro ou fora do Brasil.
              </p>

              <p>Tempo médio estimado para análise da ANVISA é de 10 dias.</p>
            </div>
          </Collapsible>

          <Collapsible
            header={
              <div className={styles.modalCollapsibleTitleContent}>
                <span>
                  5.
                  <span className={styles.modalCollapsibleTitle}>
                    Aquisição e Importação do Produto
                  </span>
                </span>
              </div>
            }
            onClick={(event: any) =>
              setCollapsibleOpen({
                ...collapsibleOpen,
                collapsibleOpen5: event.target.isOpen,
              })
            }
            align="right"
            isOpen={collapsibleOpen.collapsibleOpen5}
          >
            <div className={styles.modalCollapsibleContent}>
              <p className="mt0">
                A compra é de responsabilidade do paciente ou de seu
                representante legal.
              </p>
              <p>
                Durante a compra, há a necessidade de o cliente anexar os
                seguintes documentos:
              </p>
              <p className={styles.modalCollapsibleContentTextBlue}>
                1. Autorização de Importação ANVISA
              </p>
              <p className={styles.modalCollapsibleContentTextBlue}>
                2. Receita Médica
              </p>
              <p className={styles.modalCollapsibleContentTextBlue}>
                3. Procuração (se for o caso)
              </p>
              <p className={styles.modalCollapsibleContentTextBlue}>
                4. Documento do Paciente
              </p>
              <p className={styles.modalCollapsibleContentTextBlue}>
                5. Documento do Representante Legal (se for o caso)
              </p>
              <p className={styles.modalCollapsibleContentTextBlue}>
                6. Comprovante de endereço
              </p>
              <p className={styles.modalCollapsibleContentTextBlue}>
                7. Outros documentos (se for o caso)
              </p>

              <p className={styles.modalCollapsibleContentTextRed}>
                Documentos anexados em formato PDF e legíveis.
              </p>

              <p>
                É possível importar de uma única vez ou parceladamente, desde
                que a receita apresentada seja adequada ao quantitativo
                importado.
              </p>
            </div>
          </Collapsible>

          <Collapsible
            header={
              <div className={styles.modalCollapsibleTitleContent}>
                <span>
                  6.
                  <span className={styles.modalCollapsibleTitle}>
                    Fiscalização e Liberação na Importação
                  </span>
                </span>
              </div>
            }
            onClick={(event: any) =>
              setCollapsibleOpen({
                ...collapsibleOpen,
                collapsibleOpen6: event.target.isOpen,
              })
            }
            align="right"
            isOpen={collapsibleOpen.collapsibleOpen6}
          >
            <div className={styles.modalCollapsibleContent}>
              <p className="mt0">
                É necessária a apresentação da receita médica emitida pelo mesmo
                médico constante na Autorização.
              </p>
              <p>
                O produto importado deve ser o mesmo da Autorização emitida pela
                Anvisa e receita médica.
              </p>
              <p>
                O produto somente poderá ser importado após a aprovação da
                ANVISA.
              </p>
              <p>Ficar atento quanto a quantidade aprovada pela ANVISA.</p>
            </div>
          </Collapsible>

          <Collapsible
            header={
              <div className={styles.modalCollapsibleTitleContent}>
                <span>
                  7.
                  <span className={styles.modalCollapsibleTitle}>
                    Legislações Consultadas
                  </span>
                </span>
              </div>
            }
            onClick={(event: any) =>
              setCollapsibleOpen({
                ...collapsibleOpen,
                collapsibleOpen7: event.target.isOpen,
              })
            }
            align="right"
            isOpen={collapsibleOpen.collapsibleOpen7}
          >
            <div className={styles.modalCollapsibleContent}>
              <p className="mt0">
                RESOLUÇÃO DA DIRETORIA COLEGIADA - RDC 17, DE 6 DE MAIO DE 2015
              </p>
              <p>
                RESOLUÇÃO DA DIRETORIA COLEGIADA - RDC 327, DE 9 DE DEZEMBRO DE
                2019
              </p>
              <p>
                RESOLUÇÃO DA DIRETORIA COLEGIADA – RDC 81, DE 5 DE NOVEMBRO DE
                2008
              </p>
              <p>
                RESOLUÇÃO DA DIRETORIA COLEGIADA – RDC 335, DE 24 DE JANEIRO DE
                2020
              </p>
              <p>INSTRUÇÃO NORMATIVA 1737/2017</p>
              <p>PORTARIA COANA 81/2017</p>
            </div>
          </Collapsible>
        </div>
      </div>

      <div className={styles.modalFooterCollapsible}>
        <div className={`${styles.modalFormFullButton}`}>
          <Button onClick={handleNextStep}>Avançar sem a doc. anvisa</Button>
        </div>

        <div className={styles.modalBoxAlert}>
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

export default ModalStep2

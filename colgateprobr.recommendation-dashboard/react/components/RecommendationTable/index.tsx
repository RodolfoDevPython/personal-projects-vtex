import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Divider from '@vtex/styleguide/lib/Divider'
// @ts-ignore
import Pagination from '@vtex/styleguide/lib/Pagination'
// @ts-ignore
import Tag from '@vtex/styleguide/lib/Tag'
import ContentLoader from 'react-content-loader'

import styles from './style.css'

interface recommendationInterface {
  id: string
  alreadyUsed: boolean
  patientEmail: string
  patientName: string
  urlCart: string
  couponCode: string
}

interface resendCouponData {
  patientEmail: string
  patientName: string
  urlCart: string
  couponCode: string
  dentistName: string
}

const initialPaginationState = {
  currentPage: 1,
  currentItemFrom: 1,
  currentItemTo: 5,
  itemsPerPage: 5,
  totalItems: 0,
  paginationAltered: false,
}

const ResendButton = ({ resendData }: any) => {
  type state = 'Initial' | 'Loading' | 'Finished'

  const onResendCouponClick = async (resendData: resendCouponData) => {
    axios.post('/_v/app/resendCoupon', resendData).then(response => {
      response.status === 204 && setButtonState('Finished')
    })
  }

  const [ButtonState, setButtonState] = useState<state>('Initial')

  if (ButtonState === 'Initial') {
    return <button className={styles.recommendationTable__button} onClick={() => { setButtonState('Loading'); onResendCouponClick(resendData) }}>Reenviar cupom</button>
  }

  if (ButtonState === 'Loading') {
    return <p className={styles.recommendationTable__resendText}>Reenviando Cupom</p>
  }

  return (
    <p className={styles.recommendationTable__resendText}>Cupom reenviado</p>
  )
}

const RecommendationTable = () => {
  const [pagination, setPagination] = useState(initialPaginationState)
  const [recommendations, setRecommendation] = useState<
    recommendationInterface[]
  >()

  const [dentist, setDentist] = useState<{
    email: string | undefined
    name: string | undefined
  }>({ email: undefined, name: undefined })

  useEffect(() => {
    axios.get('/no-cache/profileSystem/getProfile').then((response: any) => {
      const { Email, FirstName, LastName } = response.data

      setDentist({ email: Email, name: `${FirstName} ${LastName}` })
    })
  }, [])

  useEffect(() => {
    dentist.email &&
      axios
        .get(
          `/_v/recommendations?dentistEmail=${dentist.email}&limit=${pagination.itemsPerPage}&page=${pagination.currentPage}`
        )
        .then((response: any) => {
          setRecommendation(response.data.recommendations)
          setPagination({ ...pagination, totalItems: response.data.total })
        })
  }, [dentist])

  useEffect(() => {
    pagination.paginationAltered !== initialPaginationState.paginationAltered &&
      axios
        .get(
          `/_v/recommendations?dentistEmail=${dentist.email}&limit=${pagination.itemsPerPage}&page=${pagination.currentPage}`
        )
        .then((response: any) => {
          setRecommendation(response.data.recommendations)
        })
  }, [pagination])

  const handleNextClick = () => {
    const newPage = pagination.currentPage + 1
    const itemFrom = pagination.currentItemTo + 1
    const itemTo = pagination.itemsPerPage * newPage

    setPagination({
      ...pagination,
      currentPage: newPage,
      currentItemFrom: itemFrom,
      currentItemTo: itemTo,
      paginationAltered: true,
    })
  }

  const handlePrevClick = () => {
    if (pagination.currentPage === 0) return

    const newPage = pagination.currentPage - 1
    const itemFrom = pagination.currentItemFrom - pagination.itemsPerPage
    const itemTo = pagination.currentItemFrom - 1

    setPagination({
      ...pagination,
      currentPage: newPage,
      currentItemFrom: itemFrom,
      currentItemTo: itemTo,
      paginationAltered: true,
    })
  }

  const handleRowsChange = (_: unknown, value: string) => {
    const itemsTo = Number(
      Number(value) > pagination.totalItems ? pagination.totalItems : value
    )

    setPagination({
      ...initialPaginationState,
      itemsPerPage: +value,
      paginationAltered: true,
      currentItemTo: itemsTo,
      totalItems: pagination.totalItems,
    })
  }

  return (
    <>
      {recommendations ? (
        <div className={styles.recommendationWrapper}>
          <p className={styles.recommendationWrapper__title}>
            Minhas recomendações
          </p>
          <div className={styles.recommendationWrapper__divider}>
            <Divider orientation="horizontal" />
          </div>
          <div className={styles.recommendationTableWraper}>
            <table className={styles.recommendationTable}>
              <thead>
                <tr className={styles.recommendationTable__title}>
                  <th>E-mail do Paciente</th>
                  <th>Nome do Paciente</th>
                  <th>Status</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {recommendations.map((recommendation) => {

                  const {
                    patientEmail,
                    patientName,
                    urlCart,
                    couponCode,
                    alreadyUsed,
                  } = recommendation

                  const resend: resendCouponData = {
                    patientEmail,
                    patientName,
                    urlCart,
                    couponCode,
                    dentistName: dentist.name ?? '',
                  }

                  return (
                    <tr
                      className={styles.recommendationTable__contentRow}
                      key={recommendation.id}
                    >
                      <td>{patientEmail}</td>
                      <td>{patientName}</td>
                      <td>
                        {alreadyUsed ? (
                          <Tag bgColor="#FFECEC" color="#EE0400">
                            Cupom Usado
                          </Tag>
                        ) : (
                          <Tag bgColor="#D4F8F5" color="#01A292">
                            Cupom Ativo
                          </Tag>
                        )}
                      </td>
                      <td>
                        {alreadyUsed === false && (
                          <ResendButton
                            resendData={resend}
                          />
                        )
                        }
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <Pagination
            onNextClick={handleNextClick}
            onPrevClick={handlePrevClick}
            onRowsChange={handleRowsChange}
            rowsOptions={[5, 10, 15, 20]}
            currentItemFrom={pagination.currentItemFrom}
            currentItemTo={pagination.currentItemTo}
            textOf="de"
            textShowRows="Itens"
            totalItems={pagination.totalItems}
          />
        </div>
      ) :
        <ContentLoader
          speed={2}
          width={952}
          height={282}
          viewBox="0 0 952 282"
          backgroundColor="#d1d1d1"
          foregroundColor="#ecebeb"
        >
          <rect x="54" y="16" rx="0" ry="0" width="226" height="40" />
          <rect x="54" y="78" rx="0" ry="0" width="163" height="20" />
          <rect x="345" y="78" rx="0" ry="0" width="141" height="20" />
          <rect x="546" y="78" rx="0" ry="0" width="94" height="21" />
          <rect x="54" y="114" rx="0" ry="0" width="163" height="20" />
          <rect x="345" y="115" rx="0" ry="0" width="141" height="20" />
          <rect x="546" y="115" rx="0" ry="0" width="94" height="21" />
          <rect x="54" y="177" rx="0" ry="0" width="73" height="24" />
          <rect x="546" y="174" rx="0" ry="0" width="92" height="22" />
        </ContentLoader>
      }
    </>
  )
}

export default RecommendationTable

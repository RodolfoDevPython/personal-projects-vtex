import React, { useState, useEffect } from 'react'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import axios from 'axios'

import ActiveDot from './ActiveDot'
import Button from './Button'
import styles from './style.css'
import {
  ActiveDotProps,
  GraphData,
  GraphRecommendations,
  GenerateGraphParams,
  ReturnGenerateGraphData,
  UsedCoupons,
} from '../../typings/recommendationGraphic'
import ContentLoader from 'react-content-loader'

const sumCouponsUsage = (usedCoupons: UsedCoupons[]) => {
  return usedCoupons.reduce((acc: any, obj: any) => {
    const key = obj.periodo

    if (!acc[key]) {
      acc[key] = 0
    }

    acc[key]++

    return acc
  }, {})
}

const generateGraphData = ({
  couponsUsedArray,
  periodToCompare,
}: GenerateGraphParams): ReturnGenerateGraphData[] => {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth() + 1
  const day = today.getDate()
  const hour = today.getHours()
  let i
  const graphData = []
  const comparation = {
    Mes: new Date(year, month, 0).getDate(),
    Dia: 24,
    Ano: 12,
  }

  const currentDate = {
    Ano: month,
    Mes: day,
    Dia: hour,
  }

  const yearArray = [
    { Periodo: 'Jan' },
    { Periodo: 'Fev' },
    { Periodo: 'Mar' },
    { Periodo: 'Abr' },
    { Periodo: 'Mai' },
    { Periodo: 'Jun' },
    { Periodo: 'Jul' },
    { Periodo: 'Ago' },
    { Periodo: 'Set' },
    { Periodo: 'Out' },
    { Periodo: 'Nov' },
    { Periodo: 'Dez' },
  ]

  for (i = 0; i < comparation[periodToCompare]; i++) {
    const Periodo = periodToCompare === 'Ano' ? yearArray[i].Periodo : i + 1

    if (couponsUsedArray[i]) {
      graphData.push({
        Periodo: `${Periodo}`,
        Cupons: Number(couponsUsedArray[i]),
      })
    } else {
      i < currentDate[periodToCompare]
        ? graphData.push({ Periodo: `${Periodo}`, Cupons: 0 })
        : graphData.push({ Periodo: `${Periodo}`, Cupons: null })
    }
  }

  return graphData
}

const RecommendationGraphic = (props: any) => {
  const [period, setPeriod] = useState<string>('ano')
  const [graphData, setGraphData] = useState<GraphData[]>()
  const [dentist, setDentist] = useState<{
    email: string | undefined
    name: string | undefined
  }>({ email: undefined, name: undefined })

  const [graphRecommendations, setGraphRecommendations] = useState<
    GraphRecommendations[]
  >()

  useEffect(() => {
    if (!graphRecommendations) return
    const today = new Date()
    const month = today.getMonth() + 1
    const day = today.getDate()
    const usedCoupons: UsedCoupons[] = []

    if (period === 'mes') {
      graphRecommendations.forEach((graphRecommendation) => {
        const recommendationDate = new Date(graphRecommendation.couponUsedDate)
        const recommendationMonth = recommendationDate.getMonth() + 1
        const recommendationDay = recommendationDate.getDate()

        recommendationMonth === month &&
          usedCoupons.push({
            periodo: `${recommendationDay}`,
            couponCode: `${graphRecommendation.couponCode}`,
          })
      })

      const couponsUsedArray = sumCouponsUsage(usedCoupons)

      const generatedGraphData = generateGraphData({
        couponsUsedArray,
        periodToCompare: 'Mes',
      })

      return setGraphData(generatedGraphData)
    }

    if (period === 'dia') {
      graphRecommendations.forEach((graphRecommendation) => {
        const recommendationDate = new Date(graphRecommendation.couponUsedDate)
        const recommendationDay = recommendationDate.getDate()
        const recommendationHour = recommendationDate.getHours()

        recommendationDay === day &&
          usedCoupons.push({
            periodo: `${recommendationHour}`,
            couponCode: `${graphRecommendation.couponCode}`,
          })
      })

      const couponsUsedArray = sumCouponsUsage(usedCoupons)

      const generatedGraphData = generateGraphData({
        couponsUsedArray,
        periodToCompare: 'Dia',
      })

      return setGraphData(generatedGraphData)
    }

    graphRecommendations.forEach((graphRecommendation) => {
      const recommendationDate = new Date(graphRecommendation.couponUsedDate)
      const recommendationMonth = recommendationDate.getMonth()

      usedCoupons.push({
        periodo: `${recommendationMonth}`,
        couponCode: `${graphRecommendation.couponCode}`,
      })
    })

    const couponsUsedArray = sumCouponsUsage(usedCoupons)

    const generatedGraphData = generateGraphData({
      couponsUsedArray,
      periodToCompare: 'Ano',
    })

    return setGraphData(generatedGraphData)
  }, [period, graphRecommendations])

  useEffect(() => {
    axios.get('/no-cache/profileSystem/getProfile').then((response: any) => {
      const { Email, FirstName, LastName } = response.data

      setDentist({ email: Email, name: `${FirstName} ${LastName}` })
    })
  }, [])

  useEffect(() => {
    dentist.email &&
      axios
        .get(`/_v/graphRecommendations?dentistEmail=${dentist.email}`)
        .then((response: any) => {
          setGraphRecommendations(response.data)
        })
  }, [dentist])

  const ActiveDotComponent = (props: ActiveDotProps) => {
    return <ActiveDot x={props.cx} y={props.cy} />
  }

  const Graph = () => {
    return (
      <ResponsiveContainer width="100%" height={210}>
        <LineChart
          data={graphData}
          margin={{ top: 10, right: 32, left: 10, bottom: 32 }}
        >
          <XAxis
            dataKey="Periodo"
            tickMargin={20}
            axisLine={false}
            tickLine={{ stroke: 'white' }}
            stroke="#8D8B87"
            style={{
              fontSize: 12,
              fontWeight: 'normal',
            }}
          />
          <YAxis
            type="number"
            domain={['dataMin', 'dataMax']}
            allowDecimals={false}
            dataKey="Cupons"
            tickCount={4}
            tickMargin={26}
            stroke="#8D8B87"
            tickLine={{ stroke: 'white' }}
            style={{
              fontSize: 12,
              fontWeight: 'normal',
            }}
            axisLine={false}
          />
          <Tooltip
            separator=" "
            itemStyle={{ color: '#222121', padding: 12, fontWeight: 'bold' }}
            labelStyle={{
              color: '#EE0400',
              backgroundColor: '#F5F5F5',
              padding: '5px 12px',
              borderRadius: 8,
            }}
            contentStyle={{ padding: 0, borderRadius: 8 }}
          />
          <CartesianGrid stroke="#EFE9EC" vertical={false} />
          <Line
            connectNulls
            strokeWidth={3}
            type="monotone"
            dataKey="Cupons"
            stroke="#EE0400"
            yAxisId={0}
            dot={false}
            activeDot={ActiveDotComponent}
          />
        </LineChart>
      </ResponsiveContainer>
    )
  }

  return (
    <>
      {graphData ? (
        <div className={styles.graphicWrapper}>
          <div className={styles.graphicHead}>
            <p className={styles.graphicHead__title}>Utilização de cupons</p>
            <div className={styles.graphicHead__buttons}>
              <Button
                selected={period === 'ano'}
                onClick={() => {
                  setPeriod('ano')
                }}
                label="Ano"
              />
              <Button
                label="Mês"
                selected={period === 'mes'}
                onClick={() => {
                  setPeriod('mes')
                }}
              />
              <Button
                label="Dia"
                selected={period === 'dia'}
                onClick={() => {
                  setPeriod('dia')
                }}
              />
            </div>
          </div>
          <div>
            <Graph />
          </div>
        </div>
      ) :
        <ContentLoader
          speed={2}
          width={952}
          height={282}
          viewBox="0 0 952 282"
          backgroundColor="#d1d1d1"
          foregroundColor="#ecebeb"
          {...props}
        >
          <rect x="54" y="16" rx="0" ry="0" width="226" height="40" />
          <rect x="750" y="15" rx="0" ry="0" width="231" height="45" />
          <rect x="54" y="77" rx="0" ry="0" width="900" height="165" />
        </ContentLoader>
      }
    </>
  )
}

export default RecommendationGraphic

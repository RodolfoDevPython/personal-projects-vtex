import { getRecommendation } from '../repositories/recommendation'

interface RecommendationTable {
  id: string
  alreadyUsed: boolean
  patientEmail: string
  patientName: string
  urlCart: string
  couponCode: string
}

interface Query {
  dentistEmail: string
  limit: number
  page: number
}

export async function getRecommendations(ctx: any, next: () => Promise<any>) {
  const { query } = ctx

  console.log('process init')

  const { dentistEmail, limit, page }: Query = query

  try {
    const { data: recommendationsData, total } = await getRecommendation(
      { email: dentistEmail, page, limit },
      ctx.clients.masterdata
    )

    const recommendations = [] as RecommendationTable[]

    recommendationsData.map((recommendation) => {
      const {
        id,
        alreadyUsed,
        patientEmail,
        patientName,
        urlCart,
        couponCode,
      } = recommendation

      const data = {
        id,
        alreadyUsed,
        patientEmail,
        patientName,
        urlCart,
        couponCode,
      }

      return recommendations.push(data)
    })

    ctx.body = { recommendations, total }
    ctx.status = 200

    await next()
  } catch (error) {
    console.log(error)
  }
}

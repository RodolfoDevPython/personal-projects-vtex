import { graphRecommendation } from '../repositories/recommendation'

interface Query {
  dentistEmail: string
}

export async function graphRecommendations(ctx: any, next: () => Promise<any>) {
  const { query } = ctx

  const today = new Date()
  const year = today.getFullYear()

  const { dentistEmail }: Query = query

  const graphRecommendationData = await graphRecommendation(
    { dentistEmail, year },
    ctx.clients.masterdata
  )

  ctx.body = graphRecommendationData
  ctx.status = 200

  await next()
}

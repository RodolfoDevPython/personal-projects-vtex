import { MasterData } from '@vtex/api'

import { dataEntity } from '../../consts'
import { sharedcartMD } from '../../typing/masterdata'

interface Args {
  email: string
  page: number
  limit: number
}

interface GraphRecommendationArgs {
  dentistEmail: string
  year: number
}

export const getRecommendation = async (
  { email, page, limit }: Args,
  client: MasterData
) => {
  const {
    data,
    pagination,
  } = await client.searchDocumentsWithPaginationInfo<sharedcartMD>({
    dataEntity,
    schema: 'sharedcart',
    fields: ['_all'],
    sort: 'createdIn ASC',
    where: `dentistEmail=${email}`,
    pagination: {
      page,
      pageSize: limit,
    },
  })

  return {
    data,
    total: pagination.total,
  }
}

export const graphRecommendation = async (
  { dentistEmail, year }: GraphRecommendationArgs,
  client: MasterData
) => {
  return client.searchDocuments({
    dataEntity,
    schema: 'sharedcart',
    fields: ['couponCode', 'couponUsedDate'],
    where: `dentistEmail=${dentistEmail} AND alreadyUsed=true AND couponUsedDate between ${year}-01-01T00:00:00 AND ${year}-12-31T23:59:59`,
    pagination: {
      page: 1,
      pageSize: 1000,
    },
  })
}

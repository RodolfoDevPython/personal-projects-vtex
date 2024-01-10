export interface GraphData {
  Periodo: string
  Cupons: number | null
}

export interface ActiveDotProps {
  cx: number
  cy: number
  dataKey: string
  fill: string
  index: number
  payload: GraphData
  r: number
  stroke: string
  strokeWidth: number
  value: number
}

export interface GraphRecommendations {
  couponCode: string
  couponUsedDate: string
}

export interface GenerateGraphParams {
  couponsUsedArray: CouponsUsedArray[]
  periodToCompare: 'Mes' | 'Dia' | 'Ano'
}

export interface CouponsUsedArray {
  CouponsUsed: number
}

export interface ReturnGenerateGraphData {
  Periodo: string
  Cupons: number | null
}

export interface UsedCoupons {
  periodo: string
  couponCode: string
}

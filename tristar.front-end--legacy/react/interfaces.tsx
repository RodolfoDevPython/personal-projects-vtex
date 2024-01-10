export interface TristarState {
  step: number
  userId: string
  name: string
  email: string
  document: string
  anvisaAuthorization: boolean
  proofAnvisaAuthorization: TristarStateFileUpload
  proofDocument: TristarStateFileUpload
  proofAddress: TristarStateFileUpload
  proofMedicalPrescription: TristarStateFileUpload
  proofDocumentLegalRepresentative: TristarStateFileUpload
  clientType: string
  register: boolean
  consumption: string
  approved: boolean
  validAnvisaAuthorization: boolean | null
  validDocument: boolean | null
  validAddress: boolean | null
  validMedicalPrescription: boolean | null
  validDocumentLegalRepresentative: boolean | null
  refusedMessage: string
  balance: string
}

export interface TristarStateFileUpload {
  name?: string
  size?: number
  type?: string
}

export interface DispatchProps {
  update(tristarState: UpdateParams): void
}

export interface UpdateParams {
  step?: number
  userId?: string
  name?: string
  email?: string
  document?: string
  anvisaAuthorization?: boolean
  proofAnvisaAuthorization?: TristarStateFileUpload
  proofDocument?: TristarStateFileUpload
  proofAddress?: TristarStateFileUpload
  proofMedicalPrescription?: TristarStateFileUpload
  proofDocumentLegalRepresentative?: TristarStateFileUpload
  clientType?: string
  register?: boolean
  consumption?: string
  approved?: boolean
  validAnvisaAuthorization?: boolean | null
  validDocument?: boolean | null
  validAddress?: boolean | null
  validMedicalPrescription?: boolean | null
  validDocumentLegalRepresentative?: boolean | null
  refusedMessage?: string
  balance?: string
}


export interface itemsProductsProps {
  available?: string
  availablequantity?: string
  bestPrice?: string
  bestPriceFormated?: string
  cacheVersionUsedToCallCheckout?: string
  dimensions?: {}
  discount?: string
  fullSellingPrice?: string
  hasDiscount?: string
  image?: string
  installments?: string
  installmentsInsterestRate?: string
  installmentsValue?: string
  listPrice?: string
  listPriceFormated?: string
  measures?: {}
  rewardValue?: string
  seller?: string
  sellerId?: string
  sku?: string
  skuname?: string
  spotPrice?: string
  taxAsInt?: string
  taxFormated?: string
  unitMultiplier?: string
  validBestPrice?: string
  validListPrice?: string

}
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

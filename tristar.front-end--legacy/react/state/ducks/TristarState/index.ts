import { TristarState, UpdateParams } from '../../../interfaces'
import { actions, types } from './types'

const INITIAL_STATE: TristarState = {
  step: 1,
  userId: '',
  name: '',
  email: '',
  document: '',
  anvisaAuthorization: true,
  proofAnvisaAuthorization: {},
  proofDocument: {},
  proofAddress: {},
  proofMedicalPrescription: {},
  proofDocumentLegalRepresentative: {},
  clientType: 'patient',
  register: false,
  consumption: '',
  approved: false,
  validAnvisaAuthorization: null,
  validDocument: null,
  validAddress: null,
  validMedicalPrescription: null,
  validDocumentLegalRepresentative: null,
  refusedMessage: '',
  balance: '',
}

export default function reducer(state = INITIAL_STATE, action: actions) {
  switch (action.type) {
    case types.UPDATE: {
      const { value } = action.payload

      return { ...state, ...value }
    }

    default:
      return state
  }
}

export const Creators = {
  update: (value: UpdateParams) => ({
    type: types.UPDATE,
    payload: {
      value,
    },
  }),
}

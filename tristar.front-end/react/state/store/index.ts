import { createStore, Store } from 'redux'

// Reducers
import Reducers from '../reducer'
import { TristarState } from '../../interfaces'

export interface AplicationState {
  TristarState: TristarState
}

const store: Store<AplicationState> = createStore(Reducers)

export default store

import {
  LRUCache,
  Service,
  ServiceContext,
  ParamsContext,
  RecorderState,
  method,
  EventContext,
} from '@vtex/api'

import { Clients } from './clients'

import { masterDataExternalController } from './handlers/masterDataExternal'

import { getDocumentIdByEmail, insertFormData } from './handlers/user';

import { orderStatusObserver } from './middlewares/orderStatusObserver';

// Create a LRU memory cache for the Status client.
// The @vtex/api HttpClient respects Cache-Control headers and uses the provided cache.
const memoryCache = new LRUCache<string, any>({ max: 2000 })
metrics.trackCache('status', memoryCache)

// const TREE_SECONDS_MS = 3 * 1000
// const CONCURRENCY = 10
declare global {
  type Context = ServiceContext<Clients, State>

  interface State extends RecorderState {
    code: number
  }
  interface StatusChangeContext extends EventContext<Clients> {
    body: {
      domain: string
      orderId: string
      currentState: string
      lastState: string
      currentChangeDate: string
      lastChangeDate: string
    }
  }

}

export default new Service<Clients, State, ParamsContext>({
  clients: {
    implementation: Clients,
    options: {
      default: {
        retries: 2,
        timeout: 800,
      },
      status: {
        memoryCache,
      },
    },
  },
  routes: {
    user: method({
      POST: [insertFormData],
    }),
    getDocumentIdByEmail: method({
      GET: [getDocumentIdByEmail]
    }),
    ordersRequest: method({
      GET: [masterDataExternalController]
    }),
  },
  events: {
    orderStatusObserver,
  },
})

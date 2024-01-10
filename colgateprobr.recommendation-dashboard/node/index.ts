import {
  ClientsConfig,
  EventContext,
  LRUCache,
  method,
  ParamsContext,
  RecorderState,
  Service,
  ServiceContext,
} from '@vtex/api'

import { Clients } from './client'
import { getRecommendations } from './middlewares/getRecommendations'
import { graphRecommendations } from './middlewares/graphRecommendations'
import { resendCouponEmail } from './middlewares/resendCouponEmail'

const TIMEOUT_MS = 800

// Create a LRU memory cache for the Status client.
// The @vtex/api HttpClient respects Cache-Control headers and uses the provided cache.
const memoryCache = new LRUCache<string, any>({ max: 5000 })

metrics.trackCache('status', memoryCache)

// This is the configuration for clients available in `ctx.clients`.
const clients: ClientsConfig<Clients> = {
  // We pass our custom implementation of the clients bag, containing the Status client.
  implementation: Clients,
  options: {
    // All IO Clients will be initialized with these options, unless otherwise specified.
    default: {
      retries: 2,
      timeout: TIMEOUT_MS,
    },
    // This key will be merged with the default options and add this cache to our Status client.
    status: {
      memoryCache,
    },
  },
}

declare global {
  type Context = ServiceContext<Clients, State>

  type State = RecorderState

  interface StatusChangeContext extends EventContext<Clients, State> {
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

export default new Service<Clients, RecorderState, ParamsContext>({
  clients,
  routes: {
    recommendations: method({
      GET: getRecommendations,
    }),
    resendCoupon: method({
      POST: resendCouponEmail,
    }),
    graphRecommendations: method({
      GET: graphRecommendations,
    }),
  },
})

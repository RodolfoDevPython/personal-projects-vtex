import {
  LRUCache,
  Service,
  ServiceContext,
  ParamsContext,
  RecorderState,
  method,
  ClientsConfig
} from '@vtex/api'
import { Clients } from './clients'
import { checkExchangeProduct } from './handlers/checkExchangeProduct'
import { exchangeProduct } from './handlers/exchange'
import { listenerStatus } from './handlers/listenerStatus'
import { getAllOrders } from './handlers/orders'

// Create a LRU memory cache for the Status client.
// The @vtex/api HttpClient respects Cache-Control headers and uses the provided cache.
const memoryCache = new LRUCache<string, any>({ max: 3000 })
metrics.trackCache('status', memoryCache)

declare global {
  type Context = ServiceContext<Clients, State>

  interface State extends RecorderState {
    code: number
  }
}

const clients: ClientsConfig<Clients> = {
  // We pass our custom implementation of the clients bag, containing the Status client.
  implementation: Clients,
  options: {
    // All IO Clients will be initialized with these options, unless otherwise specified.
    default: {
      retries: 2,
      timeout: 5000,
    },
    // This key will be merged with the default options and add this cache to our Status client.
    status: {
      memoryCache,
    },
  },
}


export default new Service<Clients, State, ParamsContext>({
  clients,
  routes: {
    checkExchangeProduct: method({
      GET: [checkExchangeProduct],
    }),
    exchangeProductByOrder: method({
      GET: [exchangeProduct],
    }),
    exchangeProduct: method({
      POST: [exchangeProduct],
    }),
    listenerStatus: method({
      POST: [listenerStatus],
    }),
    orders: method({
      GET: [getAllOrders],
    }),
  },
})

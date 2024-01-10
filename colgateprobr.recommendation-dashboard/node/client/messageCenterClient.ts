import {
  ExternalClient,
  InstanceOptions,
  IOContext,
  RequestConfig
} from '@vtex/api'

const HOST = 'mailservice.vtex.com.br'
const PATH = '/api/mail-service/pvt/sendmail'

export default class MessageCenterClient extends ExternalClient {

  constructor(ctx: IOContext, options?: InstanceOptions) {
    super(`${HOST}`, ctx, {
      ...options,
    })
  }

  public post = <T>(templateName: string, jsonData: any, config: RequestConfig = {}) => {
    const { authToken, segmentToken } = this.context
    const segmentTokenCookie = segmentToken
      ? `vtex_segment=${segmentToken};`
      : ''

    const authCookie = authToken
      ? `VtexIdclientAutCookie=${authToken}`
      : ''

    config.headers = {
      ...config.headers,
      ...this.options?.headers,
      Cookie: `${segmentTokenCookie}${authCookie}`,
    }

    const url = `http://${this.options?.baseURL || HOST}${PATH}?an=${this.context.account}`

    const body = {
      templateName,
      jsonData
    }

    return this.http.post<T>(url, body, config)
  }
}

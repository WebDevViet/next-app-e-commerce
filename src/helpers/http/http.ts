// * Interceptors
import { initInterceptors } from '@/helpers/http/interceptor'

// * Types
import { ErrorInterceptor, Interceptors, RequestInterceptor, ResponseInterceptor } from '@/types/interceptor'
import { ResponseSuccess } from '@/types/response/response'

type MethodHttpInterceptor<T> = (options: T, method?: 'push' | 'unshift') => void

type OptionsHttpRequest = Omit<RequestInit, 'body' | 'method'> & {
  body?: any
}

export type FetchInit = OptionsHttpRequest & {
  url: string
  method: string
}

interface ConstructorHttp {
  baseUrl?: string
  credentials?: RequestCredentials
}

class Http {
  private interceptors: Interceptors = initInterceptors
  private baseUrl: string
  private requestBase: Pick<RequestInit, 'credentials'>
  refreshingToken: Promise<ResponseSuccess<null>> | null = null

  constructor({ baseUrl, credentials }: ConstructorHttp) {
    this.baseUrl = baseUrl ? baseUrl.replace(/\/+$/, '') : ''
    this.requestBase = { credentials }
  }

  requestInterceptor: MethodHttpInterceptor<RequestInterceptor> = (interceptor, method = 'push') => {
    this.interceptors.request[method](interceptor)
  }

  responseInterceptor: MethodHttpInterceptor<ResponseInterceptor> = (interceptor, method = 'push') => {
    this.interceptors.response[method](interceptor)
  }

  errorInterceptor: MethodHttpInterceptor<ErrorInterceptor> = (interceptor, method = 'push') => {
    this.interceptors.error[method](interceptor)
  }

  request =
    (method: string) =>
    async <T = null>(url: string, options?: OptionsHttpRequest): Promise<ResponseSuccess<T>> => {
      let body: FormData | string | undefined = undefined

      if (options?.body instanceof FormData) {
        body = options.body
      } else if (options?.body) {
        body = JSON.stringify(options.body)
      }

      const fetchInit: FetchInit = {
        ...this.requestBase,
        ...options,
        method,
        url,
        body
      }

      // Request Interceptors
      await Promise.all(
        this.interceptors.request.map((interceptor) => {
          const result = interceptor({ fetchInit, http: this })
          return result instanceof Promise ? result : Promise.resolve(result)
        })
      )

      const fullUrl = this.baseUrl ? `${this.baseUrl}/${url.replace(/^\/+/, '')}` : url

      const response = await fetch(fullUrl, fetchInit)

      let responseHttp = {
        status: response.status,
        payload: await response.json(),
        response
      }

      // Error Interceptors
      if (!response.ok) {
        for (const interceptor of this.interceptors.error) {
          const interceptorError = interceptor({ responseHttp, fetchInit, http: this })
          if (!(interceptorError instanceof Promise)) continue

          const result = await interceptorError

          if (result) {
            responseHttp = result
            break
          }
        }
      }

      // Response Interceptors
      await Promise.all(
        this.interceptors.response.map((interceptor) => {
          const result = interceptor({ responseHttp, http: this })
          return result instanceof Promise ? result : Promise.resolve(result)
        })
      )

      return responseHttp
    }

  async retry<T = null>(fetchInit: FetchInit): Promise<ResponseSuccess<T>> {
    return this.request(fetchInit.method)<T>(fetchInit?.url, fetchInit)
  }

  get = this.request('GET')

  delete = this.request('DELETE')

  post = this.request('POST')

  put = this.request('PUT')
}

export default Http

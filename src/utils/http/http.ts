import { type ResponseHttp } from '@/types/response/response'

interface Interceptors {
  request: ((options: RequestInit) => RequestInit)[]
  response: ((response: Response) => void)[]
  error: ((response: Response) => void)[]
}

interface ConstructorHttp {
  baseUrl?: string
  credentials?: RequestCredentials
}

class Http {
  private interceptors: Interceptors = {
    request: [],
    response: [],
    error: []
  }

  private baseUrl: string
  private requestBase: Pick<RequestInit, 'credentials'>

  constructor({ baseUrl, credentials }: ConstructorHttp) {
    this.baseUrl = baseUrl ? baseUrl.replace(/\/+$/, '') : ''
    this.requestBase = { credentials }
  }

  setBaseUrl(baseUrl: string) {
    this.baseUrl = baseUrl.replace(/\/+$/, '')
  }

  requestInterceptor(interceptor: (options: RequestInit) => RequestInit) {
    this.interceptors.request.push(interceptor)
  }

  responseInterceptor(interceptor: (data: any) => any) {
    this.interceptors.response.push(interceptor)
  }

  errorInterceptor(interceptor: (err: any) => void) {
    this.interceptors.error.push(interceptor)
  }

  async sendRequest<Data>(url: string, options: RequestInit): Promise<ResponseHttp<Data>> {
    options = { ...this.requestBase, ...options }

    for (const requestInterceptor of this.interceptors.request) {
      options = requestInterceptor(options)
    }

    const fullUrl = this.baseUrl ? `${this.baseUrl}/${url.replace(/^\/+/, '')}` : url

    const response = await fetch(fullUrl, options)

    if (!response.ok) {
      for (const interceptor of this.interceptors.error) {
        interceptor(response)
      }
    } else {
      for (const interceptor of this.interceptors.response) {
        interceptor(response)
      }
    }

    return {
      statuscode: response.status,
      payload: await response.json()
    }
  }

  async retry(config: Response) {
    return this.sendRequest(config.url, config)
  }

  async request<Data>(method: string, url: string, body?: any, options?: RequestInit): Promise<ResponseHttp<Data>> {
    const config: RequestInit = { ...options, method, body: body ? JSON.stringify(body) : undefined }
    return this.sendRequest<Data>(url, config)
  }

  async get<Data>(url: string, options?: RequestInit): Promise<ResponseHttp<Data>> {
    return this.request<Data>('GET', url, undefined, options)
  }

  async post<Data>(url: string, body: any, options?: RequestInit): Promise<ResponseHttp<Data>> {
    return this.request<Data>('POST', url, body, options)
  }

  async put<Data>(url: string, body: any, options?: RequestInit): Promise<ResponseHttp<Data>> {
    return this.request<Data>('PUT', url, body, options)
  }

  async delete<Data>(url: string, options?: RequestInit): Promise<ResponseHttp<Data>> {
    return this.request<Data>('DELETE', url, undefined, options)
  }
}

export default Http

export type THttp = {
  [K in keyof Http]: Http[K]
}

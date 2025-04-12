import Http, { FetchInit } from '@/helpers/http/http'
import { ResponseHttp, ResponseSuccess } from '@/types/response/response'

export type RequestInterceptor = ({
  fetchInit,
  http
}: {
  fetchInit: FetchInit
  http: Http
}) => Promise<RequestInit> | RequestInit

export type ResponseInterceptor = <T = null>({
  responseHttp,
  http
}: {
  responseHttp: ResponseHttp<any>
  http: Http
}) => Promise<ResponseSuccess<T> | void> | void

export type ErrorInterceptor = <T = null>({
  responseHttp,
  fetchInit,
  http
}: {
  responseHttp: ResponseHttp<any>
  fetchInit: FetchInit
  http: Http
}) => Promise<ResponseSuccess<T> | void> | void

export interface Interceptors {
  request: RequestInterceptor[]
  response: ResponseInterceptor[]
  error: ErrorInterceptor[]
}

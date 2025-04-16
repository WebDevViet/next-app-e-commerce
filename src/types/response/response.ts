import { type TypeError } from '@/enums/typeError'

export interface ResponseHttp<T> {
  status: number
  payload: T
  response: Response
}

export type PayloadSuccess<T = null> = {
  data: T
  message: string
  errors: null
  typeError: null
}

export type PayloadError = {
  data: null
  message: string
  errors: null
  typeError: TypeError
}

export type PayloadErrors = {
  data: null
  message: string
  errors: Record<string, string>
  typeError: TypeError
}

export type ResponseSuccess<T = null> = ResponseHttp<PayloadSuccess<T>>
export type ResponseError = ResponseHttp<PayloadError | PayloadErrors>

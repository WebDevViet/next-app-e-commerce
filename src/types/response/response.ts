export interface ResponseHttp<T> {
  statuscode: number
  payload: PayloadResponse<T>
}

interface PayloadResponse<T> {
  typeError: string
  data: T
  message: string
  status: string
}

export interface ErrorResponse {
  status: 'Error'
  message: 'Unauthorized'
  typeError: 'UNAUTHORIZED'
  data: null
}

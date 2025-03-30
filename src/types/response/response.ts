export interface ResponseHttp<Data> {
  statuscode: number
  payload: ResponseServer<Data>
}

export type ResponseServer<Data> = {
  typeError: string
  data: Data
  message: string
  status: string
}

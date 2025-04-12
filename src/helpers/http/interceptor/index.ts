// * Request Interceptors
import { throwHttpError } from '@/helpers/http/interceptor/errorInterceptors'
import { addJsonContentType } from '@/helpers/http/interceptor/requestInterceptors'

// * Response Interceptors

// * Error Interceptors

export const initInterceptors = {
  request: [addJsonContentType],
  response: [],
  error: [throwHttpError]
}

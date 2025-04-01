import { type THttp } from '@/utils/http/http'

// * Request Interceptors
import { addJsonContentType } from '@/utils/http/requestInterceptors'

// * Response Interceptors

// * Error Interceptors

const requestInterceptors: ((options: RequestInit) => RequestInit)[] = [addJsonContentType]
const responseInterceptors: ((response: Response) => void)[] = []
const errorInterceptors: ((response: Response) => void)[] = []

const applyCommonInterceptors = (http: THttp) => {
  // for (const interceptor of requestInterceptor) {
  //   http.requestInterceptor(interceptor)
  // }

  requestInterceptors.forEach(http.requestInterceptor.bind(http))
  responseInterceptors.forEach(http.responseInterceptor.bind(http))
  errorInterceptors.forEach(http.errorInterceptor.bind(http))
}

export default applyCommonInterceptors

import { type THttp } from '@/utils/http/http'

// * Request Interceptors
import { addJsonContentType } from '@/utils/http/requestInterceptor'

// * Response Interceptors

// * Error Interceptors

export const standardInterceptor = {
  requestInterceptor: [addJsonContentType],
  responseInterceptor: [],
  errorInterceptor: []
}

const applyStandardInterceptor = (http: THttp) => {
  const { requestInterceptor, responseInterceptor, errorInterceptor } = standardInterceptor

  // for (const interceptor of requestInterceptor) {
  //   http.requestInterceptor(interceptor)
  // }

  requestInterceptor.forEach(http.requestInterceptor.bind(http))
  responseInterceptor.forEach(http.responseInterceptor.bind(http))
  errorInterceptor.forEach(http.errorInterceptor.bind(http))
}

export default applyStandardInterceptor

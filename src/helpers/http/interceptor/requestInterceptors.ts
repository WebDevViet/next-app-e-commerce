// * Types
import { RequestInterceptor } from '@/types/interceptor'

export const addJsonContentType: RequestInterceptor = ({ fetchInit }) => {
  if (fetchInit.body instanceof FormData) return fetchInit

  fetchInit.headers = {
    ...fetchInit.headers,
    'Content-Type': 'application/json'
  }

  return fetchInit
}

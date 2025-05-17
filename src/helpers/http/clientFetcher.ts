// * Types
import { API_ROUTES } from '@/constants/apiRoutes'
import { TypeError } from '@/enums/typeError'
import Http from '@/helpers/http/http'
import { payloadHttpError } from '@/helpers/http/interceptor/errorInterceptors'

const clientFetcher = new Http({ baseUrl: '/api', credentials: 'include' })

clientFetcher.errorInterceptor(async ({ responseHttp, fetchInit, http }) => {
  const error = payloadHttpError.safeParse(responseHttp.payload)
  if (!error.success) return

  if (error.data.typeError === TypeError.AccessTokenExpiredError) {
    http.refreshingToken ??= (async () => await http.post(API_ROUTES.auth.refreshToken))()

    try {
      await http.refreshingToken
      return await http.retry(fetchInit)
    } catch (error: unknown) {
      throw error
    } finally {
      http.refreshingToken = null
    }
  }
}, 'unshift')

export default clientFetcher

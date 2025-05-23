// * Types
import { API_ROUTES } from '@/constants/apiRoutes'
import { TypeError } from '@/enums/typeError'
import Http from '@/helpers/http/http'
import { HttpError, payloadHttpError } from '@/helpers/http/interceptor/errorInterceptors'

const clientFetcher = new Http({ baseUrl: '/api', credentials: 'include' })

clientFetcher.errorInterceptor(async ({ responseHttp, fetchInit, http }) => {
  const { success, data } = payloadHttpError.safeParse(responseHttp)
  if (!success) {
    throw new HttpError({
      status: responseHttp.status,
      payload: {
        errors: null,
        data: null,
        message: responseHttp.payload?.message ?? 'Unexpected error',
        typeError: TypeError.UnexpectedError
      }
    })
  }

  if (data.payload.typeError === TypeError.AccessTokenExpiredError) {
    http.refreshingToken ??= (async () => await http.post(API_ROUTES.auth.refreshToken))()

    try {
      await http.refreshingToken
      return await http.retry(fetchInit)
    } catch (error) {
      throw error
    } finally {
      http.refreshingToken = null
    }
  }
}, 'unshift')

export default clientFetcher

// * Types
import { API_ROUTES } from '@/configs/apiRoutes'
import { TypeError } from '@/enums/typeError'
import Http from '@/helpers/http/http'
import { payloadHttpError } from '@/helpers/http/interceptor/errorInterceptors'

const clientToServer = new Http({ baseUrl: process.env.NEXT_PUBLIC_API_SERVER, credentials: 'include' })

clientToServer.errorInterceptor(async ({ responseHttp, fetchInit, http }) => {
  const error = payloadHttpError.safeParse(responseHttp.payload)
  if (!error.success) return

  if (error.data.typeError === TypeError.AccessTokenExpiredError) {
    http.refreshingToken ??= (async () => await http.post(API_ROUTES.AUTH.REFRESH_TOKEN))()

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

export default clientToServer

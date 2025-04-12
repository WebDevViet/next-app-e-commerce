// * Types
import { API_ROUTES } from '@/configs/apiRoutes'
import Http, { FetchInit } from '@/helpers/http/http'
import { ResponseSuccess } from '@/types/response/response'

// * Utils
import { isServer } from '@/utils/checkEnvironment'

type ServerRefreshToken = <T = null>({
  fetchInit,
  http
}: {
  fetchInit: FetchInit
  http: Http
}) => Promise<ResponseSuccess<T> | never>

const serverRefreshToken: ServerRefreshToken = async ({ fetchInit, http }) => {
  http.refreshingToken ??= (async () => await http.post(API_ROUTES.AUTH.REFRESH_TOKEN))()

  try {
    const { response } = await http.refreshingToken

    if (isServer()) {
      const newCookie = response.headers.getSetCookie().join('; ')
      fetchInit.headers = new Headers()
      fetchInit.headers.set('Cookie', newCookie)
    }

    return await http.retry(fetchInit)
  } catch (error: unknown) {
    throw error
  } finally {
    http.refreshingToken = null
  }
}

export default serverRefreshToken

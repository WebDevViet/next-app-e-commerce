// * Types
import { API_ROUTES } from '@/configs/apiRoutes'
import Http, { FetchInit } from '@/helpers/http/http'
import { ResponseSuccess } from '@/types/response/response'

type ClientRefreshToken = <T = null>({
  fetchInit,
  http
}: {
  fetchInit: FetchInit
  http: Http
}) => Promise<ResponseSuccess<T> | never>

const clientRefreshToken: ClientRefreshToken = async ({ fetchInit, http }) => {
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

export default clientRefreshToken

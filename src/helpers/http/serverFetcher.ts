import 'server-only'

// * Next
import { cookies } from 'next/headers'

// * libs
import { z } from 'zod'

// * Http
import Http from '@/helpers/http/http'

// * Config
import { API_ROUTES } from '@/constants/apiRoutes'

// * Types
import { TypeError } from '@/enums/typeError'
import { cookieSchema } from '@/schemas/cookieSchema'

// * Interceptors
import { HttpError, payloadHttpError } from '@/helpers/http/interceptor/errorInterceptors'

// * Utils
import { envServer } from '@/configs/envServer'
import { JWT_REGEX } from '@/constants/regex'

const serverFetcher = new Http({ baseUrl: envServer.API_SERVER + '/api', credentials: 'include' })

serverFetcher.requestInterceptor(async ({ fetchInit }) => {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('Authorization')?.value
  const refreshToken = cookieStore.get('refresh_token')?.value
  const loggedIn = cookieStore.get('logged_in')?.value

  const headers = new Headers(fetchInit.headers)

  if (accessToken) {
    headers.append('Cookie', `Authorization=${accessToken}`)
  }
  if (refreshToken) {
    headers.append('Cookie', `refresh_token=${refreshToken}`)
  }
  if (loggedIn) {
    headers.append('Cookie', `logged_in=${loggedIn}`)
  }

  headers.set('x-api-key', envServer.API_KEY)

  fetchInit.headers = headers

  return fetchInit
})

serverFetcher.errorInterceptor(async ({ responseHttp, fetchInit, http }) => {
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
    http.refreshingToken ??= (async () =>
      await http.post(API_ROUTES.auth.refreshToken, { body: { serverKey: envServer.NEXTJS_SERVER_KEY } }))()

    try {
      const { payload } = await http.refreshingToken

      const authTokenSchema = z.object({
        accessToken: cookieSchema.extend({
          value: z.string().regex(JWT_REGEX)
        }),
        refreshToken: cookieSchema.extend({
          value: z.string().regex(JWT_REGEX)
        })
      })

      const { data: cookieList, error } = authTokenSchema.safeParse(payload.data)

      if (error) throw error

      const { accessToken, refreshToken } = cookieList

      const cookieStore = await cookies()

      cookieStore.set({ name: 'Authorization', ...accessToken, value: `Bearer ${accessToken.value}` })

      cookieStore.set({ name: 'refresh_token', ...refreshToken })

      return await http.retry(fetchInit)
    } catch (error) {
      throw error
    } finally {
      http.refreshingToken = null
    }
  }
}, 'unshift')

export default serverFetcher

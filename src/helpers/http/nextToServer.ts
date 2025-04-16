import 'server-only'

// * Next
import { cookies } from 'next/headers'

// * libs
import qs from 'querystring'
import { z } from 'zod'

// * Http
import Http from '@/helpers/http/http'

// * Config
import { API_ROUTES } from '@/constants/apiRoutes'

// * Types
import { TypeError } from '@/enums/typeError'

// * Interceptors
import { payloadHttpError } from '@/helpers/http/interceptor/errorInterceptors'

// * Utils
import { BEARER_TOKEN_REGEX, JWT_REGEX } from '@/constants/regex'
import { camelizeKeys } from '@/utils/changeCase'
import { envServer } from '@/configs/envServer'

const nextToServer = new Http({ baseUrl: envServer.API_SERVER + '/api', credentials: 'include' })

nextToServer.requestInterceptor(async ({ fetchInit }) => {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('Authorization')?.value
  const refreshToken = cookieStore.get('refresh-token')?.value

  const headers = new Headers(fetchInit.headers)

  if (accessToken) {
    headers.append('Cookie', `Authorization=${accessToken}`)
  }
  if (refreshToken) {
    headers.append('Cookie', `refresh-token=${refreshToken}`)
  }
  headers.set('x-api-key', envServer.API_KEY)

  fetchInit.headers = headers

  return fetchInit
})

nextToServer.errorInterceptor(async ({ responseHttp, fetchInit, http }) => {
  const error = payloadHttpError.safeParse(responseHttp.payload)
  if (!error.success) return

  if (error.data.typeError === TypeError.AccessTokenExpiredError) {
    http.refreshingToken ??= (async () => await http.post(API_ROUTES.auth.refreshToken))()

    try {
      const { response } = await http.refreshingToken
      const cookiesHeader = response.headers.getSetCookie() // Lấy cookie từ Node.js

      if (cookiesHeader.length === 0) return

      const cookieListParsed = cookiesHeader.map((cookieStr) => {
        const cookieParsed = { ...qs.parse(cookieStr, '; ') }

        const name = Object.keys(cookieParsed)[0]
        const value = cookieParsed[name]

        delete cookieParsed[name]

        const cookieOptions = camelizeKeys(cookieParsed)

        if ('sameSite' in cookieOptions && typeof cookieOptions.sameSite === 'string') {
          cookieOptions.sameSite = cookieOptions.sameSite.toLowerCase()
        }

        return {
          name,
          value,
          ...cookieOptions
        }
      })

      const cookieSchema = z.object({
        path: z.string().startsWith('/'),
        expires: z.coerce.date(),
        httpOnly: z
          .string()
          .optional()
          .transform(() => true),
        secure: z
          .string()
          .optional()
          .transform(() => true),
        sameSite: z
          .union([z.literal('lax'), z.literal('none'), z.literal('strict'), z.undefined(), z.boolean()])
          .default('lax')
      })

      const cookieListSchema = z.tuple([
        cookieSchema.extend({
          name: z.literal('Authorization'),
          value: z.string().regex(BEARER_TOKEN_REGEX)
        }),
        cookieSchema.extend({
          name: z.literal('refresh-token'),
          value: z.string().regex(JWT_REGEX)
        })
      ])

      // console.log('🚀 ~ nextToServer.errorInterceptor ~ cookiesParsed:', cookieListParsed)
      const { success, data: cookieList } = cookieListSchema.safeParse(cookieListParsed)
      // console.log('🚀 ~ nextToServer.errorInterceptor ~ result:', cookieList)

      if (!success) return

      const cookieStore = await cookies()

      cookieList.forEach((cookie) => {
        cookieStore.set(cookie)
      })

      return await http.retry(fetchInit)
    } catch (error: unknown) {
      throw error
    } finally {
      http.refreshingToken = null
    }
  }
}, 'unshift')

export default nextToServer

// * Next
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

// * Paths
import { authPaths, protectedPaths } from '@/configs/path'

// * Constants
import { envServer } from '@/configs/envServer'
import { corsOptions } from '@/constants/corsConstants'

// * H
import { isValidOrigin } from '@/helpers/helpersMiddleware'

export function middleware(request: NextRequest) {
  const requestUrl = new URL(request.nextUrl)

  // Handle CORS preflight requests
  if (request.method === 'OPTIONS') {
    const isAllowedOrigin = isValidOrigin(request)

    const preflightHeaders = {
      ...(isAllowedOrigin && { 'Access-Control-Allow-Origin': request.headers.get('origin') ?? '' }),
      ...corsOptions
    }

    return NextResponse.json({}, { headers: preflightHeaders })
  }

  // Handle API requests
  if (requestUrl.pathname.startsWith('/api/')) {
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-api-key', envServer.API_KEY)

    const rewrittenUrl = `${envServer.API_SERVER}${requestUrl.pathname}${requestUrl.search}`

    return NextResponse.rewrite(rewrittenUrl, {
      request: { headers: requestHeaders }
    })
  }

  // Redirect to login if not logged in and accessing protected paths
  if (
    protectedPaths.some((regex) => requestUrl.pathname.match(regex)) &&
    !request.cookies.get('refresh-token')?.value
  ) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Redirect to home if logged in and accessing auth paths
  if (authPaths.some((path) => requestUrl.pathname.startsWith(path)) && request.cookies.get('refresh-token')?.value) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Handle simple requests
  const response = NextResponse.next()

  const isAllowedOrigin = isValidOrigin(request)

  if (isAllowedOrigin) {
    response.headers.set('Access-Control-Allow-Origin', request.headers.get('origin') ?? '')
  }

  Object.entries(corsOptions).forEach(([key, value]) => {
    response.headers.set(key, value)
  })

  return response
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/me', '/login', '/api/:path*', '/register', '/products/:path*']
}

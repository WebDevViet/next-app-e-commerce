// * Next
import type { NextRequest } from 'next/server'

// * Paths
import { authPaths, privatePaths } from '@/configs/path'
import { NextResponse } from 'next/server'
import { envServer } from '@/configs/envServer'

const allowedOrigins = JSON.parse(envServer.ALLOWED_ORIGINS || "['http://localhost:3000']")

const corsOptions = {
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization'
}

export function middleware(request: NextRequest) {
  // Method 1
  const { pathname } = request.nextUrl
  const refreshToken = request.cookies.get('refresh-token')?.value
  // console.log('🚀 ~ middleware ~ pathname:', pathname)

  // console.log('🚀 ~ middleware ~ refreshToken:', refreshToken)

  const origin = request.headers.get('origin') ?? ''

  // Check the origin from the request
  const isAllowedOrigin = allowedOrigins.includes(origin)

  // Handle preflighted requests
  const isPreflight = request.method === 'OPTIONS'

  if (isPreflight) {
    const preflightHeaders = {
      ...(isAllowedOrigin && { 'Access-Control-Allow-Origin': origin }),
      ...corsOptions
    }
    return NextResponse.json({}, { headers: preflightHeaders })
  }

  if (pathname === envServer.PATH_LOGOUT) {
    const response = NextResponse.redirect(new URL('/login', request.url))
    response.cookies.delete('Authorization')
    response.cookies.delete('refresh-token')
    return response
  }

  // Method 2
  const url = new URL(request.url)

  // Rewrite API requests
  if (url.pathname.startsWith('/api/')) {
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-api-key', envServer.API_KEY)

    const rewrittenUrl = `${envServer.API_SERVER}${url.pathname}${url.search}`
    // console.log('🚀 ~ middleware ~ rewrittenUrl:', rewrittenUrl)
    return NextResponse.rewrite(rewrittenUrl, {
      headers: requestHeaders
    })
  }

  // * CORS

  // Not logged in and private paths, redirect to login
  if (privatePaths.some((regex) => pathname.match(regex)) && !refreshToken) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  // Logged in and auth paths, redirect to home
  if (authPaths.some((path) => pathname.startsWith(path)) && refreshToken) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Handle simple requests
  const response = NextResponse.next()

  if (isAllowedOrigin) {
    response.headers.set('Access-Control-Allow-Origin', origin)
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

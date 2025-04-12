// * Next
import type { NextRequest } from 'next/server'

// * Paths
import { authPaths, privatePaths } from '@/constants/path'
import { NextResponse } from 'next/server'
import { env } from '@/configs/env'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const refreshToken = request.cookies.get('Authorization')?.value

  if (pathname === env.PATH_LOGOUT) {
    const response = NextResponse.redirect(new URL('/login', request.url))
    response.cookies.delete('Authorization')
    response.cookies.delete('refresh-token')
    return response
  }

  // Chưa đăng nhập thì không cho vào private paths
  if (privatePaths.some((regex) => pathname.match(regex)) && !refreshToken) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  // Đăng nhập rồi thì không cho vào login/register nữa
  if (authPaths.some((path) => pathname.startsWith(path)) && refreshToken) {
    return NextResponse.redirect(new URL('/', request.url))
  }
  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/me', '/login', '/vip', '/register', '/products/:path*']
}

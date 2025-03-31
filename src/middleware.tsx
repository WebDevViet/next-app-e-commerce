import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const privatePaths = ['/me', /^\/products\/\d+\/edit$/]
const authPaths = ['/login', '/register']

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const refreshToken = request.cookies.get('refresh_token')?.value

  if (pathname === '/ok-chua') {
    const response = NextResponse.redirect(new URL('/login', request.url))
    response.cookies.delete('refresh_token')
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

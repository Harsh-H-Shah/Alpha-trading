import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // We can't access localStorage in middleware (it's server-side/edge).
  // For a true auth, we'd check a strict cookie. 
  // Since we are using a Mock Auth with LocalStorage, middleware is tricky because it doesn't see LS.
  // STRATEGY: 
  // We will actually handle protection mostly via Client-Side checks in the Context or Layout for this Mock implementation,
  // OR we can set a cookie on login.
  // Let's rely on client-side redirection in AuthContext/Components for the simplified mock.
  // BUT the user asked for "proper" auth. The best way to mimic this without a backend is setting a cookie.

  // Let's skip Middleware for now if we rely purely on LocalStorage, 
  // OR we can make the Login function set a dummy cookie 'auth_token'.

  // Approach: Let's assume we set a cookie 'auth_token' on login.
  const token = request.cookies.get('auth_token')?.value
  
  const protectedPaths = ['/dashboard', '/prediction', '/patterns', '/explorer', '/learn']
  const isProtected = protectedPaths.some(path => request.nextUrl.pathname.startsWith(path))

  if (isProtected && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (request.nextUrl.pathname === '/login' && token) {
     return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/prediction/:path*', '/patterns/:path*', '/explorer/:path*', '/learn/:path*', '/login'],
}

import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Routes publiques (pas besoin d'auth)
  const publicRoutes = ['/', '/login', '/register', '/about', '/author']
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next()
  }

  // Routes protégées (besoin d'auth)
  const protectedRoutes = ['/dashboard', '/learning', '/chat', '/profile']
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  )

  if (isProtectedRoute) {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })

    if (!token) {
      const url = new URL('/login', request.url)
      url.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}

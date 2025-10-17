import { auth } from '@/auth'
import { NextResponse } from 'next/server'
import { getRouteConfig } from './lib/rbac/middleware-config'
import { getDefaultDashboard } from './lib/rbac/roles'
import type { UserRole } from './lib/rbac/permissions'

export default auth((req) => {
  const { pathname } = req.nextUrl

  if (pathname.startsWith('/api/')) {
    return NextResponse.next()
  }

  const routeConfig = getRouteConfig(pathname)
  const session = req.auth

  if (routeConfig?.requireAuth && !session) {
    const loginUrl = new URL('/login', req.url)
    loginUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(loginUrl)
  }

  if (session) {
    const userRole = session.user.role as UserRole

    if (pathname === '/dashboard') {
      const dashboardUrl = getDefaultDashboard(userRole)
      return NextResponse.redirect(new URL(dashboardUrl, req.url))
    }

    if (routeConfig?.allowedRoles) {
      const hasAccess = routeConfig.allowedRoles.includes(userRole)

      if (!hasAccess) {
        const unauthorizedUrl = new URL('/unauthorized', req.url)
        return NextResponse.redirect(unauthorizedUrl)
      }
    }
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}

import { NextRequest, NextResponse } from 'next/server'
import { verifySessionFromRequest } from './lib/utils/auth'
import { getRouteConfig } from './lib/rbac/middleware-config'
import { getDefaultDashboard } from './lib/rbac/roles'
import type { UserRole } from './lib/rbac/permissions'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip middleware for API routes
  if (pathname.startsWith('/api/')) {
    return NextResponse.next()
  }

  const routeConfig = getRouteConfig(pathname)

  if (!routeConfig || routeConfig.requireAuth === false) {
    return NextResponse.next()
  }

  const session = await verifySessionFromRequest(request)

  if (!session && routeConfig.requireAuth) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(loginUrl)
  }

  if (session) {
    const userRole = session.role as UserRole

    if (pathname === '/dashboard') {
      const dashboardUrl = getDefaultDashboard(userRole)
      return NextResponse.redirect(new URL(dashboardUrl, request.url))
    }

    if (routeConfig.allowedRoles) {
      const hasAccess = routeConfig.allowedRoles.includes(userRole)

      if (!hasAccess) {
        const unauthorizedUrl = new URL('/unauthorized', request.url)
        return NextResponse.redirect(unauthorizedUrl)
      }
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - /api (API routes)
     * - /_next/static (static files)
     * - /_next/image (image optimization)
     * - /favicon.ico (favicon)
     * - /*.svg, /*.png, etc. (static assets)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}

import type { UserRole } from './permissions'

export interface RouteConfig {
  path: string
  allowedRoles?: UserRole[]
  requireAuth?: boolean
}

export const ROUTE_CONFIG: RouteConfig[] = [
  {
    path: '/',
    requireAuth: false,
  },
  {
    path: '/login',
    requireAuth: false,
  },
  {
    path: '/register',
    requireAuth: false,
  },
  {
    path: '/forgot-password',
    requireAuth: false,
  },
  {
    path: '/reset-password',
    requireAuth: false,
  },
  {
    path: '/verify-email',
    requireAuth: false,
  },
  {
    path: '/super-admin',
    allowedRoles: ['super_admin'],
    requireAuth: true,
  },
  {
    path: '/school-admin',
    allowedRoles: ['school_admin'],
    requireAuth: true,
  },
  {
    path: '/panitia',
    allowedRoles: ['panitia'],
    requireAuth: true,
  },
  {
    path: '/student',
    allowedRoles: ['student'],
    requireAuth: true,
  },
  {
    path: '/dashboard',
    requireAuth: true,
  },
  {
    path: '/profile',
    requireAuth: true,
  },
  {
    path: '/api',
    requireAuth: false,
  },
]

export function matchRoute(pathname: string, pattern: string): boolean {
  if (pathname === pattern) return true
  if (pathname.startsWith(pattern + '/')) return true
  return false
}

export function getRouteConfig(pathname: string): RouteConfig | null {
  const configs = ROUTE_CONFIG.filter((config) =>
    matchRoute(pathname, config.path)
  ).sort((a, b) => b.path.length - a.path.length)

  return configs[0] || null
}

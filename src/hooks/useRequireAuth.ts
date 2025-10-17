'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import type { UserRole } from '@/lib/rbac/permissions'

interface UseRequireAuthOptions {
  redirectTo?: string
  requiredRole?: UserRole | UserRole[]
}

export function useRequireAuth(options: UseRequireAuthOptions = {}) {
  const { redirectTo = '/login', requiredRole } = options
  const { data: session, status } = useSession()
  const router = useRouter()
  const loading = status === 'loading'

  useEffect(() => {
    if (loading) return

    if (!session) {
      router.push(redirectTo)
      return
    }

    if (requiredRole && session.user) {
      const allowedRoles = Array.isArray(requiredRole)
        ? requiredRole
        : [requiredRole]

      if (!allowedRoles.includes(session.user.role as UserRole)) {
        router.push('/unauthorized')
      }
    }
  }, [session, loading, router, redirectTo, requiredRole])

  return { user: session?.user, userData: session?.user, loading }
}

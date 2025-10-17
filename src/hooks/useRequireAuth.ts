'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import type { UserRole } from '@/lib/rbac/permissions'

interface UseRequireAuthOptions {
  redirectTo?: string
  requiredRole?: UserRole | UserRole[]
}

export function useRequireAuth(options: UseRequireAuthOptions = {}) {
  const { redirectTo = '/login', requiredRole } = options
  const { user, userData, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (loading) return

    if (!user) {
      router.push(redirectTo)
      return
    }

    if (requiredRole && userData) {
      const allowedRoles = Array.isArray(requiredRole)
        ? requiredRole
        : [requiredRole]

      if (!allowedRoles.includes(userData.role as UserRole)) {
        router.push('/unauthorized')
      }
    }
  }, [user, userData, loading, router, redirectTo, requiredRole])

  return { user, userData, loading }
}

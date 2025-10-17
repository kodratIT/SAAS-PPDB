'use client'

import { useMemo } from 'react'
import { useSession } from 'next-auth/react'
import {
  hasPermission,
  hasAnyPermission,
  hasAllPermissions,
  getRolePermissions,
  type Permission,
  type UserRole,
} from '@/lib/rbac/permissions'

export function usePermissions() {
  const { data: session } = useSession()
  
  const role = (session?.user?.role as UserRole) || 'student'

  const permissions = useMemo(() => {
    return getRolePermissions(role)
  }, [role])

  const checkPermission = useMemo(
    () => (permission: Permission) => hasPermission(role, permission),
    [role]
  )

  const checkAnyPermission = useMemo(
    () => (permissionList: Permission[]) =>
      hasAnyPermission(role, permissionList),
    [role]
  )

  const checkAllPermissions = useMemo(
    () => (permissionList: Permission[]) =>
      hasAllPermissions(role, permissionList),
    [role]
  )

  return {
    role,
    permissions,
    hasPermission: checkPermission,
    hasAnyPermission: checkAnyPermission,
    hasAllPermissions: checkAllPermissions,
  }
}

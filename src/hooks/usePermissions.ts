'use client'

import { useMemo } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import {
  hasPermission,
  hasAnyPermission,
  hasAllPermissions,
  getRolePermissions,
  type Permission,
  type UserRole,
} from '@/lib/rbac/permissions'

export function usePermissions() {
  const { userData } = useAuth()
  
  const role = (userData?.role as UserRole) || 'student'

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

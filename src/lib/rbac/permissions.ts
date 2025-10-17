/**
 * RBAC Permission System
 * 
 * Permission format: <resource>.<action>
 * Actions: create, read, update, delete, manage (all)
 */

export type Permission =
  | 'schools.create'
  | 'schools.read'
  | 'schools.update'
  | 'schools.delete'
  | 'schools.manage'
  | 'users.create'
  | 'users.read'
  | 'users.update'
  | 'users.delete'
  | 'users.manage'
  | 'applications.read'
  | 'applications.create'
  | 'applications.update'
  | 'applications.delete'
  | 'applications.verify'
  | 'applications.score'
  | 'applications.accept'
  | 'periods.create'
  | 'periods.read'
  | 'periods.update'
  | 'periods.delete'
  | 'plans.read'
  | 'plans.create'
  | 'plans.update'
  | 'plans.delete'
  | 'plans.manage'
  | 'documents.read'
  | 'documents.verify'
  | 'documents.reject'
  | 'payments.read'
  | 'payments.verify'
  | 'reports.view'
  | 'reports.export'
  | 'settings.read'
  | 'settings.update'
  | 'settings.manage'
  | 'notifications.send'
  | 'notifications.manage'

export type UserRole = 'super_admin' | 'school_admin' | 'panitia' | 'student'

export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  super_admin: [
    'schools.manage',
    'users.manage',
    'applications.read',
    'applications.verify',
    'applications.score',
    'applications.accept',
    'periods.create',
    'periods.read',
    'periods.update',
    'periods.delete',
    'plans.manage',
    'documents.read',
    'documents.verify',
    'documents.reject',
    'payments.read',
    'payments.verify',
    'reports.view',
    'reports.export',
    'settings.manage',
    'notifications.manage',
  ],

  school_admin: [
    'schools.read',
    'schools.update',
    'users.create',
    'users.read',
    'users.update',
    'users.delete',
    'applications.read',
    'applications.accept',
    'periods.create',
    'periods.read',
    'periods.update',
    'periods.delete',
    'documents.read',
    'payments.read',
    'payments.verify',
    'reports.view',
    'reports.export',
    'settings.read',
    'settings.update',
    'notifications.send',
  ],

  panitia: [
    'schools.read',
    'users.read',
    'applications.read',
    'applications.verify',
    'applications.score',
    'periods.read',
    'documents.read',
    'documents.verify',
    'documents.reject',
    'payments.read',
    'settings.read',
  ],

  student: [
    'schools.read',
    'applications.read',
    'applications.create',
    'applications.update',
    'periods.read',
    'documents.read',
    'payments.read',
    'settings.read',
    'settings.update',
  ],
}

export function hasPermission(role: UserRole, permission: Permission): boolean {
  const permissions = ROLE_PERMISSIONS[role] || []
  
  if (permissions.includes(permission)) {
    return true
  }

  const [resource, action] = permission.split('.')
  const managePermission = `${resource}.manage` as Permission
  
  return permissions.includes(managePermission)
}

export function hasAnyPermission(
  role: UserRole,
  permissions: Permission[]
): boolean {
  return permissions.some((permission) => hasPermission(role, permission))
}

export function hasAllPermissions(
  role: UserRole,
  permissions: Permission[]
): boolean {
  return permissions.every((permission) => hasPermission(role, permission))
}

export function getRolePermissions(role: UserRole): Permission[] {
  return ROLE_PERMISSIONS[role] || []
}

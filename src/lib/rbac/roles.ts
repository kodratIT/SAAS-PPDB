import type { UserRole } from './permissions'

export const ROLE_HIERARCHY: Record<UserRole, number> = {
  super_admin: 100,
  school_admin: 50,
  panitia: 30,
  student: 10,
}

export function isRoleHigherOrEqual(
  userRole: UserRole,
  requiredRole: UserRole
): boolean {
  return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[requiredRole]
}

export const ROLE_LABELS: Record<UserRole, string> = {
  super_admin: 'Super Administrator',
  school_admin: 'Administrator Sekolah',
  panitia: 'Panitia PPDB',
  student: 'Siswa/Orang Tua',
}

export const ROLE_DESCRIPTIONS: Record<UserRole, string> = {
  super_admin: 'Akses penuh ke seluruh platform',
  school_admin: 'Mengelola sekolah dan PPDB',
  panitia: 'Verifikasi dan penilaian pendaftar',
  student: 'Mendaftar sebagai calon siswa',
}

export const ROLE_DASHBOARD_ROUTES: Record<UserRole, string> = {
  super_admin: '/super-admin/dashboard',
  school_admin: '/school-admin/dashboard',
  panitia: '/panitia/dashboard',
  student: '/student/dashboard',
}

export function getDefaultDashboard(role: UserRole): string {
  return ROLE_DASHBOARD_ROUTES[role] || '/dashboard'
}

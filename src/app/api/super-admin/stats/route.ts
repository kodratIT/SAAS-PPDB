import { NextResponse } from 'next/server'
import { verifySession } from '@/lib/utils/auth'
import { hasPermission } from '@/lib/rbac/permissions'
import { collection, getCountFromServer, query, where } from 'firebase/firestore'
import { db } from '@/lib/firebase/config'
import type { UserRole } from '@/lib/rbac/permissions'

export async function GET() {
  try {
    const session = await verifySession()

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!hasPermission(session.role as UserRole, 'reports.view')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const schoolsSnapshot = await getCountFromServer(collection(db, 'schools'))
    const usersSnapshot = await getCountFromServer(collection(db, 'users'))
    
    const activeSchoolsQuery = query(
      collection(db, 'schools'),
      where('subscription.status', '==', 'active')
    )
    const activeSchoolsSnapshot = await getCountFromServer(activeSchoolsQuery)

    const applicationsCount = 0

    const stats = {
      totalSchools: schoolsSnapshot.data().count,
      activeSchools: activeSchoolsSnapshot.data().count,
      totalUsers: usersSnapshot.data().count,
      totalApplications: applicationsCount,
      revenue: 0,
      growthRates: {
        schools: 12.5,
        users: 8.3,
        applications: 15.2,
        revenue: 10.0,
      },
    }

    return NextResponse.json({ stats })
  } catch (error: any) {
    console.error('Error fetching stats:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

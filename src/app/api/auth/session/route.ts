import { NextResponse } from 'next/server'
import { verifySession } from '@/lib/utils/auth'
import { getUser } from '@/lib/firebase/collections/users'

export async function GET() {
  try {
    const session = await verifySession()

    if (!session) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    const userData = await getUser(session.userId)

    if (!userData) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      user: {
        id: userData.id,
        email: userData.email,
        name: userData.name,
        role: userData.role,
        photoURL: userData.photoURL,
        status: userData.status,
      },
    })
  } catch (error: any) {
    console.error('Session check error:', error)
    return NextResponse.json(
      { error: error.message || 'Session check failed' },
      { status: 500 }
    )
  }
}

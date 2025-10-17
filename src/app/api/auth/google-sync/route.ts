import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase/admin'

export async function POST(request: NextRequest) {
  try {
    const { userId, email, name, photoURL } = await request.json()

    if (!userId || !adminDb) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }

    const userDoc = await adminDb.collection('users').doc(userId).get()

    if (!userDoc.exists()) {
      await adminDb
        .collection('users')
        .doc(userId)
        .set({
          email,
          name,
          photoURL,
          role: 'student',
          status: 'active',
          twoFactorEnabled: false,
          preferences: {
            emailNotif: true,
            smsNotif: false,
            pushNotif: true,
            language: 'id',
          },
          createdAt: new Date(),
          updatedAt: new Date(),
        })

      return NextResponse.json({ role: 'student', status: 'created' })
    }

    const userData = userDoc.data()
    return NextResponse.json({ role: userData?.role || 'student', status: 'exists' })
  } catch (error: any) {
    console.error('Google sync error:', error)
    return NextResponse.json(
      { error: error.message || 'Sync failed' },
      { status: 500 }
    )
  }
}

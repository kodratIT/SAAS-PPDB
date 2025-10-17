import { NextRequest, NextResponse } from 'next/server'
import { adminAuth, adminDb } from '@/lib/firebase/admin'
import { createSession } from '@/lib/utils/auth'

export async function POST(request: NextRequest) {
  try {
    const { idToken } = await request.json()

    if (!idToken) {
      return NextResponse.json(
        { error: 'ID token is required' },
        { status: 400 }
      )
    }

    if (!adminAuth) {
      return NextResponse.json(
        { error: 'Authentication service unavailable' },
        { status: 500 }
      )
    }

    const decodedToken = await adminAuth.verifyIdToken(idToken)
    const userId = decodedToken.uid

    // Get user from Firestore using Admin SDK
    if (!adminDb) {
      return NextResponse.json(
        { error: 'Database service unavailable' },
        { status: 500 }
      )
    }

    const userDoc = await adminDb.collection('users').doc(userId).get()

    if (!userDoc.exists) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const userData = userDoc.data()

    if (userData?.status !== 'active') {
      return NextResponse.json(
        {
          error:
            userData?.status === 'suspended'
              ? 'Akun Anda telah ditangguhkan'
              : 'Akun Anda tidak aktif',
        },
        { status: 403 }
      )
    }

    // Update last login
    await adminDb.collection('users').doc(userId).update({
      lastLogin: new Date(),
    })

    await createSession({
      userId,
      role: userData.role,
      email: userData.email,
    })

    return NextResponse.json({
      success: true,
      user: {
        id: userId,
        email: userData.email,
        name: userData.name,
        role: userData.role,
        photoURL: userData.photoURL,
      },
    })
  } catch (error: any) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: error.message || 'Login failed' },
      { status: 500 }
    )
  }
}

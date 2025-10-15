import { NextResponse } from 'next/server'
import { db } from '@/lib/firebase/config'
import { collection, getDocs } from 'firebase/firestore'

export async function GET() {
  try {
    // Test Firestore connection
    const testCollection = collection(db, 'test')
    await getDocs(testCollection)

    return NextResponse.json({
      success: true,
      message: 'Firebase connection successful!',
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Firebase connection error:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Firebase connection failed',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

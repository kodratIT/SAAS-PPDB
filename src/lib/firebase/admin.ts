import { initializeApp, getApps, cert } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore'
import { getStorage } from 'firebase-admin/storage'

// Only initialize on server-side
if (getApps().length === 0 && typeof window === 'undefined') {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  })
}

export const adminAuth = typeof window === 'undefined' ? getAuth() : null
export const adminDb = typeof window === 'undefined' ? getFirestore() : null
export const adminStorage = typeof window === 'undefined' ? getStorage() : null

'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import {
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth'
import { auth, db } from '@/lib/firebase/config'
import { doc, getDoc, setDoc, Timestamp } from 'firebase/firestore'
import type { User as DBUser } from '@/types/database'

interface AuthContextType {
  user: User | null
  userData: DBUser | null
  loading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name: string) => Promise<void>
  logout: () => Promise<void>
  loginWithGoogle: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
  sendVerificationEmail: () => Promise<void>
  refreshUserData: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [userData, setUserData] = useState<DBUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchUserData = async (uid: string): Promise<DBUser | null> => {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid))
      if (userDoc.exists()) {
        return { id: userDoc.id, ...userDoc.data() } as DBUser
      }
      return null
    } catch (err) {
      console.error('Error fetching user data:', err)
      return null
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser)

      if (firebaseUser) {
        const data = await fetchUserData(firebaseUser.uid)
        setUserData(data)
      } else {
        setUserData(null)
      }

      setLoading(false)
    })

    return unsubscribe
  }, [])

  const register = async (email: string, password: string, name: string) => {
    try {
      setError(null)
      const result = await createUserWithEmailAndPassword(auth, email, password)

      await setDoc(doc(db, 'users', result.user.uid), {
        email,
        name,
        role: 'student',
        status: 'active',
        twoFactorEnabled: false,
        preferences: {
          emailNotif: true,
          smsNotif: false,
          pushNotif: true,
          language: 'id',
        },
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      })

      await sendEmailVerification(result.user)
    } catch (err: any) {
      console.error('Registration error:', err)
      setError(translateFirebaseError(err.code))
      throw err
    }
  }

  const login = async (email: string, password: string) => {
    try {
      setError(null)
      const result = await signInWithEmailAndPassword(auth, email, password)

      const idToken = await result.user.getIdToken()

      console.log('Calling /api/auth/login...')
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken }),
      })

      console.log('Response status:', response.status)
      console.log('Response content-type:', response.headers.get('content-type'))

      const contentType = response.headers.get('content-type')
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text()
        console.error('Non-JSON response:', text.substring(0, 200))
        throw new Error('Server returned non-JSON response. Check server logs.')
      }

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Login failed')
      }
    } catch (err: any) {
      console.error('Login error:', err)
      setError(translateFirebaseError(err.code) || err.message)
      throw err
    }
  }

  const loginWithGoogle = async () => {
    try {
      setError(null)
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)

      const userDoc = await getDoc(doc(db, 'users', result.user.uid))

      if (!userDoc.exists()) {
        await setDoc(doc(db, 'users', result.user.uid), {
          email: result.user.email,
          name: result.user.displayName || result.user.email?.split('@')[0],
          photoURL: result.user.photoURL,
          role: 'student',
          status: 'active',
          twoFactorEnabled: false,
          preferences: {
            emailNotif: true,
            smsNotif: false,
            pushNotif: true,
            language: 'id',
          },
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now(),
        })
      }

      const idToken = await result.user.getIdToken()

      console.log('Calling /api/auth/login (Google)...')
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken }),
      })

      console.log('Response status:', response.status)
      
      const contentType = response.headers.get('content-type')
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text()
        console.error('Non-JSON response:', text.substring(0, 200))
        throw new Error('Server returned non-JSON response. Check server logs.')
      }

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Login failed')
      }
    } catch (err: any) {
      console.error('Google login error:', err)
      setError(err.message)
      throw err
    }
  }

  const logout = async () => {
    try {
      setError(null)

      await fetch('/api/auth/logout', {
        method: 'POST',
      })

      await signOut(auth)
    } catch (err: any) {
      console.error('Logout error:', err)
      setError(err.message)
      throw err
    }
  }

  const resetPassword = async (email: string) => {
    try {
      setError(null)
      await sendPasswordResetEmail(auth, email)
    } catch (err: any) {
      console.error('Password reset error:', err)
      setError(translateFirebaseError(err.code))
      throw err
    }
  }

  const sendVerificationEmail = async () => {
    try {
      setError(null)
      if (user) {
        await sendEmailVerification(user)
      }
    } catch (err: any) {
      console.error('Send verification error:', err)
      setError(translateFirebaseError(err.code))
      throw err
    }
  }

  const refreshUserData = async () => {
    if (user) {
      const data = await fetchUserData(user.uid)
      setUserData(data)
    }
  }

  const value = {
    user,
    userData,
    loading,
    error,
    login,
    register,
    logout,
    loginWithGoogle,
    resetPassword,
    sendVerificationEmail,
    refreshUserData,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

function translateFirebaseError(code: string): string {
  const errors: Record<string, string> = {
    'auth/email-already-in-use': 'Email sudah digunakan',
    'auth/invalid-email': 'Email tidak valid',
    'auth/operation-not-allowed': 'Operasi tidak diizinkan',
    'auth/weak-password': 'Password terlalu lemah (minimal 6 karakter)',
    'auth/user-disabled': 'Akun telah dinonaktifkan',
    'auth/user-not-found': 'Email atau password salah',
    'auth/wrong-password': 'Email atau password salah',
    'auth/too-many-requests': 'Terlalu banyak percobaan. Coba lagi nanti',
    'auth/network-request-failed': 'Koneksi internet bermasalah',
    'auth/popup-closed-by-user': 'Login dibatalkan',
    'auth/cancelled-popup-request': 'Login dibatalkan',
  }

  return errors[code] || 'Terjadi kesalahan. Silakan coba lagi'
}

# Sprint 2: Setup Guide - Step-by-Step Implementation

This guide provides detailed, step-by-step instructions for implementing all tasks in Sprint 2: Authentication & Super Admin Foundation.

---

## 📋 Table of Contents

- [Story 2.1: Authentication System](#story-21-authentication-system-8-sp)
- [Story 2.2: Authentication UI](#story-22-authentication-ui-6-sp)
- [Story 2.3: Role-Based Access Control](#story-23-role-based-access-control-5-sp)
- [Story 2.4: Super Admin Dashboard](#story-24-super-admin-dashboard-4-sp)
- [Story 2.5: Subscription Plan Management](#story-25-subscription-plan-management-3-sp)
- [Troubleshooting](#troubleshooting)

---

# STORY 2.1: Authentication System (8 SP)

**Assigned to**: TL + FSD1  
**Duration**: 2 days  
**Priority**: P0 (Must complete first)

---

## Task 2.1.1: Setup Firebase Auth Hooks and Context

**Owner**: TL  
**Duration**: 3 hours

### Steps:

**1. Install dependencies**:
```bash
npm install react-hook-form zod @hookform/resolvers
```

**2. Create Auth Context** (`src/contexts/AuthContext.tsx`):
```typescript
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
  signInWithPopup
} from 'firebase/auth'
import { auth, db } from '@/lib/firebase/config'
import { doc, getDoc, setDoc } from 'firebase/firestore'

interface AuthContextType {
  user: User | null
  userData: any | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name: string) => Promise<void>
  logout: () => Promise<void>
  loginWithGoogle: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
  sendVerificationEmail: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [userData, setUserData] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user)
      
      if (user) {
        // Fetch user data from Firestore
        const userDoc = await getDoc(doc(db, 'users', user.uid))
        if (userDoc.exists()) {
          setUserData(userDoc.data())
        }
      } else {
        setUserData(null)
      }
      
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password)
  }

  const register = async (email: string, password: string, name: string) => {
    const result = await createUserWithEmailAndPassword(auth, email, password)
    
    // Create user document in Firestore
    await setDoc(doc(db, 'users', result.user.uid), {
      email,
      name,
      role: 'student', // Default role
      status: 'active',
      twoFactorEnabled: false,
      preferences: {
        emailNotif: true,
        smsNotif: false,
        pushNotif: true,
        language: 'id'
      },
      createdAt: new Date(),
      updatedAt: new Date()
    })

    // Send verification email
    await sendEmailVerification(result.user)
  }

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth, provider)
    
    // Check if user document exists
    const userDoc = await getDoc(doc(db, 'users', result.user.uid))
    
    if (!userDoc.exists()) {
      // Create user document for new Google user
      await setDoc(doc(db, 'users', result.user.uid), {
        email: result.user.email,
        name: result.user.displayName,
        photoURL: result.user.photoURL,
        role: 'student',
        status: 'active',
        twoFactorEnabled: false,
        preferences: {
          emailNotif: true,
          smsNotif: false,
          pushNotif: true,
          language: 'id'
        },
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }
  }

  const logout = async () => {
    await signOut(auth)
  }

  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email)
  }

  const sendVerificationEmail = async () => {
    if (user) {
      await sendEmailVerification(user)
    }
  }

  const value = {
    user,
    userData,
    loading,
    login,
    register,
    logout,
    loginWithGoogle,
    resetPassword,
    sendVerificationEmail
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
```

**3. Update Root Layout** (`src/app/layout.tsx`):
```typescript
import { AuthProvider } from '@/contexts/AuthContext'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
```

### Files Created:
- `src/contexts/AuthContext.tsx`

### Files Modified:
- `src/app/layout.tsx`

### Acceptance Criteria:
- ✅ Auth context provides all auth functions
- ✅ User state managed correctly
- ✅ No console errors

---

## Task 2.1.2: Implement Login/Register/Logout Functions

**Owner**: FSD1  
**Duration**: 3 hours

### Steps:

**1. Create Auth Utilities** (`src/lib/utils/auth.ts`):
```typescript
import { jwtVerify, SignJWT } from 'jose'
import { cookies } from 'next/headers'

const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key-min-32-characters'
)

export async function createSession(userId: string, role: string) {
  const token = await new SignJWT({ userId, role })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(SECRET_KEY)

  cookies().set('session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/'
  })

  return token
}

export async function verifySession() {
  const token = cookies().get('session')?.value

  if (!token) {
    return null
  }

  try {
    const verified = await jwtVerify(token, SECRET_KEY)
    return verified.payload as { userId: string; role: string }
  } catch (err) {
    return null
  }
}

export async function deleteSession() {
  cookies().delete('session')
}
```

**2. Create Auth API Routes**:

**Login API** (`src/app/api/auth/login/route.ts`):
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { adminAuth } from '@/lib/firebase/admin'
import { createSession } from '@/lib/utils/auth'
import { getUser } from '@/lib/firebase/collections/users'

export async function POST(request: NextRequest) {
  try {
    const { idToken } = await request.json()

    // Verify Firebase ID token
    const decodedToken = await adminAuth!.verifyIdToken(idToken)
    const userId = decodedToken.uid

    // Get user data
    const userData = await getUser(userId)

    if (!userData) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    if (userData.status !== 'active') {
      return NextResponse.json(
        { error: 'Account suspended or inactive' },
        { status: 403 }
      )
    }

    // Create session
    await createSession(userId, userData.role)

    return NextResponse.json({
      success: true,
      user: {
        id: userId,
        email: userData.email,
        name: userData.name,
        role: userData.role
      }
    })
  } catch (error: any) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: error.message || 'Login failed' },
      { status: 500 }
    )
  }
}
```

**Logout API** (`src/app/api/auth/logout/route.ts`):
```typescript
import { NextResponse } from 'next/server'
import { deleteSession } from '@/lib/utils/auth'

export async function POST() {
  try {
    await deleteSession()
    
    return NextResponse.json({
      success: true,
      message: 'Logged out successfully'
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}
```

**Session API** (`src/app/api/auth/session/route.ts`):
```typescript
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

    return NextResponse.json({
      success: true,
      user: userData
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}
```

**3. Install JWT dependencies**:
```bash
npm install jose
```

**4. Add JWT_SECRET to `.env.local`**:
```env
JWT_SECRET=your-super-secret-key-minimum-32-characters-long
```

### Files Created:
- `src/lib/utils/auth.ts`
- `src/app/api/auth/login/route.ts`
- `src/app/api/auth/logout/route.ts`
- `src/app/api/auth/session/route.ts`

### Acceptance Criteria:
- ✅ Login API returns session token
- ✅ Logout API clears session
- ✅ Session verification works

---

## Task 2.1.3: Add Google OAuth Integration

**Owner**: FSD1  
**Duration**: 2 hours

### Steps:

**1. Configure Google OAuth in Firebase Console**:
- Go to Firebase Console → Authentication → Sign-in method
- Enable Google
- Add authorized domains (localhost, your domain)
- Copy Web SDK configuration

**2. Update Auth Context** (already done in Task 2.1.1):
- `loginWithGoogle()` function already implemented

**3. Test OAuth Flow**:
```typescript
// Will be used in Login page (Story 2.2)
const handleGoogleLogin = async () => {
  try {
    await loginWithGoogle()
    // Get ID token and call login API
    const idToken = await user?.getIdToken()
    await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken })
    })
  } catch (error) {
    console.error('Google login error:', error)
  }
}
```

### Acceptance Criteria:
- ✅ Google OAuth popup works
- ✅ User created in Firestore
- ✅ Session created after OAuth

---

## Task 2.1.4: Password Reset Functionality

**Owner**: FSD1  
**Duration**: 2 hours

### Steps:

**1. Create Password Reset API** (`src/app/api/auth/reset-password/route.ts`):
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { adminAuth } from '@/lib/firebase/admin'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    // Verify user exists
    try {
      await adminAuth!.getUserByEmail(email)
    } catch (error) {
      // Don't reveal if user exists or not (security)
      return NextResponse.json({
        success: true,
        message: 'If the email exists, a reset link has been sent'
      })
    }

    // Firebase client SDK will handle sending email
    // This API just validates the request

    return NextResponse.json({
      success: true,
      message: 'Password reset email sent'
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}
```

**2. Create Password Reset Confirmation Handler** (`src/app/(auth)/reset-password/page.tsx`):
```typescript
'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { confirmPasswordReset } from 'firebase/auth'
import { auth } from '@/lib/firebase/config'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  password: z.string().min(8, 'Password min 8 characters'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
})

export default function ResetPasswordPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const oobCode = searchParams.get('oobCode')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema)
  })

  const onSubmit = async (data: any) => {
    if (!oobCode) {
      setError('Invalid reset link')
      return
    }

    try {
      await confirmPasswordReset(auth, oobCode, data.password)
      setSuccess(true)
      setTimeout(() => router.push('/login'), 3000)
    } catch (error: any) {
      setError(error.message)
    }
  }

  if (success) {
    return (
      <div className="text-center">
        <h2>Password Reset Successful!</h2>
        <p>Redirecting to login...</p>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Reset Your Password</h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Input
            type="password"
            placeholder="New Password"
            {...register('password')}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message as string}</p>
          )}
        </div>

        <div>
          <Input
            type="password"
            placeholder="Confirm Password"
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">{errors.confirmPassword.message as string}</p>
          )}
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? 'Resetting...' : 'Reset Password'}
        </Button>
      </form>
    </div>
  )
}
```

### Files Created:
- `src/app/api/auth/reset-password/route.ts`
- `src/app/(auth)/reset-password/page.tsx`

### Acceptance Criteria:
- ✅ Reset email sent
- ✅ Reset link works
- ✅ New password saved

---

## Task 2.1.5: Email Verification

**Owner**: FSD1  
**Duration**: 2 hours

### Steps:

**1. Create Email Verification Handler** (`src/app/(auth)/verify-email/page.tsx`):
```typescript
'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { applyActionCode } from 'firebase/auth'
import { auth } from '@/lib/firebase/config'

export default function VerifyEmailPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const oobCode = searchParams.get('oobCode')
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    const verifyEmail = async () => {
      if (!oobCode) {
        setStatus('error')
        setError('Invalid verification link')
        return
      }

      try {
        await applyActionCode(auth, oobCode)
        setStatus('success')
        setTimeout(() => router.push('/login'), 3000)
      } catch (error: any) {
        setStatus('error')
        setError(error.message)
      }
    }

    verifyEmail()
  }, [oobCode, router])

  if (status === 'loading') {
    return <div className="text-center mt-10">Verifying email...</div>
  }

  if (status === 'success') {
    return (
      <div className="text-center mt-10">
        <h2 className="text-2xl font-bold text-green-600">Email Verified!</h2>
        <p className="mt-4">Redirecting to login...</p>
      </div>
    )
  }

  return (
    <div className="text-center mt-10">
      <h2 className="text-2xl font-bold text-red-600">Verification Failed</h2>
      <p className="mt-4">{error}</p>
    </div>
  )
}
```

**2. Add resend verification button** in Login page (will be done in Story 2.2)

### Files Created:
- `src/app/(auth)/verify-email/page.tsx`

### Acceptance Criteria:
- ✅ Verification email sent on register
- ✅ Verification link works
- ✅ User can resend verification

---

# STORY 2.2: Authentication UI (6 SP)

**Assigned to**: FSD1 + FED  
**Duration**: 1.5 days  
**Priority**: P0

---

## Task 2.2.1: Create Login Page

**Owner**: FED  
**Duration**: 3 hours

### Steps:

**1. Create Login Page** (`src/app/(auth)/login/page.tsx`):
```typescript
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'

const loginSchema = z.object({
  email: z.string().email('Email tidak valid'),
  password: z.string().min(1, 'Password harus diisi')
})

type LoginFormData = z.infer<typeof loginSchema>

export default function LoginPage() {
  const router = useRouter()
  const { login, loginWithGoogle } = useAuth()
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true)
      setError('')
      
      await login(data.email, data.password)
      
      // Get ID token and call login API
      const user = auth.currentUser
      if (user) {
        const idToken = await user.getIdToken()
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ idToken })
        })

        if (!response.ok) {
          throw new Error('Login failed')
        }

        const result = await response.json()
        
        // Redirect based on role
        if (result.user.role === 'super_admin') {
          router.push('/super-admin/dashboard')
        } else if (result.user.role === 'school_admin') {
          router.push('/school-admin/dashboard')
        } else if (result.user.role === 'panitia') {
          router.push('/panitia/dashboard')
        } else {
          router.push('/student/dashboard')
        }
      }
    } catch (error: any) {
      setError(error.message || 'Login gagal')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true)
      setError('')
      
      await loginWithGoogle()
      
      const user = auth.currentUser
      if (user) {
        const idToken = await user.getIdToken()
        await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ idToken })
        })
        
        router.push('/student/dashboard')
      }
    } catch (error: any) {
      setError(error.message || 'Login dengan Google gagal')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Masuk ke akun PPDB Anda
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="nama@email.com"
                {...register('email')}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register('password')}
              />
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>

            <div className="text-right">
              <Link 
                href="/forgot-password" 
                className="text-sm text-blue-600 hover:underline"
              >
                Lupa password?
              </Link>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Login'}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Atau</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={handleGoogleLogin}
              disabled={isLoading}
            >
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Login dengan Google
            </Button>

            <p className="text-center text-sm text-gray-600">
              Belum punya akun?{' '}
              <Link href="/register" className="text-blue-600 hover:underline">
                Daftar sekarang
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
```

**2. Create layout for auth pages** (`src/app/(auth)/layout.tsx`):
```typescript
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  )
}
```

### Files Created:
- `src/app/(auth)/login/page.tsx`
- `src/app/(auth)/layout.tsx`

### Acceptance Criteria:
- ✅ Login form validates input
- ✅ Shows error messages
- ✅ Redirects on success
- ✅ Google login works

---

## Task 2.2.2: Create Register Page

**Owner**: FED  
**Duration**: 3 hours

### Steps:

**1. Create Register Page** (`src/app/(auth)/register/page.tsx`):
```typescript
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'

const registerSchema = z.object({
  name: z.string().min(3, 'Nama minimal 3 karakter'),
  email: z.string().email('Email tidak valid'),
  password: z.string().min(8, 'Password minimal 8 karakter'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Password tidak cocok",
  path: ["confirmPassword"]
})

type RegisterFormData = z.infer<typeof registerSchema>

export default function RegisterPage() {
  const router = useRouter()
  const { register: registerUser } = useAuth()
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema)
  })

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setIsLoading(true)
      setError('')
      
      await registerUser(data.email, data.password, data.name)
      
      setSuccess(true)
      setTimeout(() => router.push('/login'), 3000)
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        setError('Email sudah terdaftar')
      } else {
        setError(error.message || 'Pendaftaran gagal')
      }
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl text-green-600">Pendaftaran Berhasil!</CardTitle>
            <CardDescription>
              Kami telah mengirim email verifikasi ke alamat email Anda. 
              Silakan cek inbox dan klik link verifikasi.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Anda akan diarahkan ke halaman login...
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Daftar</CardTitle>
          <CardDescription>
            Buat akun PPDB baru
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="name">Nama Lengkap</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                {...register('name')}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="nama@email.com"
                {...register('email')}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register('password')}
              />
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                {...register('confirmPassword')}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Daftar'}
            </Button>

            <p className="text-center text-sm text-gray-600">
              Sudah punya akun?{' '}
              <Link href="/login" className="text-blue-600 hover:underline">
                Login di sini
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
```

### Files Created:
- `src/app/(auth)/register/page.tsx`

### Acceptance Criteria:
- ✅ Register form validates input
- ✅ Password confirmation works
- ✅ Shows success message
- ✅ Sends verification email

---

## Task 2.2.3: Create Forgot Password Page

**Owner**: FED  
**Duration**: 2 hours

### Steps:

**1. Create Forgot Password Page** (`src/app/(auth)/forgot-password/page.tsx`):
```typescript
'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'

const schema = z.object({
  email: z.string().email('Email tidak valid')
})

type FormData = z.infer<typeof schema>

export default function ForgotPasswordPage() {
  const { resetPassword } = useAuth()
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema)
  })

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true)
      setError('')
      
      await resetPassword(data.email)
      
      setSuccess(true)
    } catch (error: any) {
      setError(error.message || 'Gagal mengirim email reset')
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl text-green-600">Email Terkirim!</CardTitle>
            <CardDescription>
              Kami telah mengirim link reset password ke email Anda.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">
              Silakan cek inbox email Anda dan klik link untuk reset password. 
              Link akan kadaluarsa dalam 1 jam.
            </p>
            <p className="text-sm text-gray-600">
              Tidak menerima email? Cek folder spam atau kirim ulang.
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/login" className="w-full">
              <Button variant="outline" className="w-full">
                Kembali ke Login
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Lupa Password?</CardTitle>
          <CardDescription>
            Masukkan email Anda untuk menerima link reset password
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="nama@email.com"
                {...register('email')}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? 'Mengirim...' : 'Kirim Link Reset'}
            </Button>

            <Link href="/login" className="w-full">
              <Button variant="ghost" className="w-full">
                Kembali ke Login
              </Button>
            </Link>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
```

### Files Created:
- `src/app/(auth)/forgot-password/page.tsx`

### Acceptance Criteria:
- ✅ Form validates email
- ✅ Sends reset email
- ✅ Shows success message
- ✅ Link to login works

---

## Task 2.2.4: Protected Route Wrapper

**Owner**: FSD1  
**Duration**: 2 hours

### Steps:

**1. Create Protected Route Component** (`src/components/auth/ProtectedRoute.tsx`):
```typescript
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles?: string[]
  redirectTo?: string
}

export function ProtectedRoute({ 
  children, 
  allowedRoles,
  redirectTo = '/login' 
}: ProtectedRouteProps) {
  const { user, userData, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push(redirectTo)
        return
      }

      if (allowedRoles && userData && !allowedRoles.includes(userData.role)) {
        router.push('/unauthorized')
      }
    }
  }, [user, userData, loading, allowedRoles, redirectTo, router])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  if (allowedRoles && userData && !allowedRoles.includes(userData.role)) {
    return null
  }

  return <>{children}</>
}
```

**2. Create Next.js Middleware** (`src/middleware.ts`):
```typescript
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifySession } from '@/lib/utils/auth'

export async function middleware(request: NextRequest) {
  const session = await verifySession()

  // Protected routes
  if (request.nextUrl.pathname.startsWith('/super-admin')) {
    if (!session || session.role !== 'super_admin') {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  if (request.nextUrl.pathname.startsWith('/school-admin')) {
    if (!session || session.role !== 'school_admin') {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  if (request.nextUrl.pathname.startsWith('/panitia')) {
    if (!session || session.role !== 'panitia') {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  if (request.nextUrl.pathname.startsWith('/student')) {
    if (!session || session.role !== 'student') {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // Redirect to dashboard if already logged in
  if (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/register') {
    if (session) {
      if (session.role === 'super_admin') {
        return NextResponse.redirect(new URL('/super-admin/dashboard', request.url))
      } else if (session.role === 'school_admin') {
        return NextResponse.redirect(new URL('/school-admin/dashboard', request.url))
      } else if (session.role === 'panitia') {
        return NextResponse.redirect(new URL('/panitia/dashboard', request.url))
      } else {
        return NextResponse.redirect(new URL('/student/dashboard', request.url))
      }
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/super-admin/:path*',
    '/school-admin/:path*',
    '/panitia/:path*',
    '/student/:path*',
    '/login',
    '/register'
  ]
}
```

**3. Create Unauthorized Page** (`src/app/unauthorized/page.tsx`):
```typescript
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900">403</h1>
        <h2 className="mt-4 text-xl font-semibold">Akses Ditolak</h2>
        <p className="mt-2 text-gray-600">
          Anda tidak memiliki izin untuk mengakses halaman ini.
        </p>
        <div className="mt-6">
          <Link href="/">
            <Button>Kembali ke Beranda</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
```

### Files Created:
- `src/components/auth/ProtectedRoute.tsx`
- `src/middleware.ts`
- `src/app/unauthorized/page.tsx`

### Acceptance Criteria:
- ✅ Middleware blocks unauthorized access
- ✅ Protected routes redirect to login
- ✅ Role-based access works
- ✅ Unauthorized page shown

---

*[Continue with Stories 2.3, 2.4, 2.5...]*

---

# Troubleshooting

## Common Issues

### Firebase Auth errors

**Issue**: `auth/user-not-found`
```
Solution: User doesn't exist. Check email spelling or register first.
```

**Issue**: `auth/wrong-password`
```
Solution: Password incorrect. Use forgot password to reset.
```

**Issue**: `auth/too-many-requests`
```
Solution: Too many failed attempts. Wait or reset password.
```

### Session issues

**Issue**: Session not persisting
```bash
# Check cookies are set
# Verify JWT_SECRET in .env.local
# Clear cookies and re-login
```

### OAuth issues

**Issue**: Google OAuth popup blocked
```
Solution: Enable popups for localhost in browser settings
```

**Issue**: OAuth redirect fails
```
Solution: Add domain to Firebase Console → Auth → Authorized domains
```

---

**Continue to**: [SUMMARY.md](SUMMARY.md) for quick reference

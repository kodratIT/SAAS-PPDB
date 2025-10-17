import { jwtVerify, SignJWT } from 'jose'
import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'

const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET || 'default-secret-change-in-production-min-32-chars'
)

const COOKIE_NAME = 'session'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7

export interface SessionPayload {
  userId: string
  role: string
  email: string
}

export async function createSession(payload: SessionPayload): Promise<string> {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(SECRET_KEY)

  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: COOKIE_MAX_AGE,
    path: '/',
  })

  return token
}

export async function verifySession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value

  if (!token) {
    return null
  }

  try {
    const verified = await jwtVerify(token, SECRET_KEY)
    return verified.payload as SessionPayload
  } catch (err) {
    console.error('Session verification failed:', err)
    return null
  }
}

export async function verifySessionFromRequest(
  request: NextRequest
): Promise<SessionPayload | null> {
  const token = request.cookies.get(COOKIE_NAME)?.value

  if (!token) {
    return null
  }

  try {
    const verified = await jwtVerify(token, SECRET_KEY)
    return verified.payload as SessionPayload
  } catch (err) {
    console.error('Session verification failed:', err)
    return null
  }
}

export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(COOKIE_NAME)
}

export async function isAuthenticated(): Promise<boolean> {
  const session = await verifySession()
  return session !== null
}

export async function requireSession(): Promise<SessionPayload> {
  const session = await verifySession()

  if (!session) {
    throw new Error('Authentication required')
  }

  return session
}

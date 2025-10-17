import { DefaultSession, DefaultUser } from 'next-auth'
import { DefaultJWT } from 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      role: 'super_admin' | 'school_admin' | 'panitia' | 'student'
      email: string
    } & DefaultSession['user']
  }

  interface User extends DefaultUser {
    role?: 'super_admin' | 'school_admin' | 'panitia' | 'student'
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id?: string
    role?: string
  }
}

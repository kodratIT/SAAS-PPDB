import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { adminAuth, adminDb } from '@/lib/firebase/admin'
import type { User as DBUser } from '@/types/database'

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      id: 'firebase',
      name: 'Firebase',
      credentials: {
        idToken: { label: 'ID Token', type: 'text' },
      },
      async authorize(credentials) {
        if (!credentials?.idToken || !adminAuth || !adminDb) {
          return null
        }

        try {
          const decodedToken = await adminAuth.verifyIdToken(
            credentials.idToken as string
          )

          const userDoc = await adminDb
            .collection('users')
            .doc(decodedToken.uid)
            .get()

          if (!userDoc.exists) {
            return null
          }

          const userData = userDoc.data() as DBUser

          if (userData.status !== 'active') {
            return null
          }

          await adminDb.collection('users').doc(decodedToken.uid).update({
            lastLogin: new Date(),
          })

          return {
            id: decodedToken.uid,
            email: userData.email,
            name: userData.name,
            role: userData.role,
            image: userData.photoURL,
          }
        } catch (error) {
          console.error('Firebase auth error:', error)
          return null
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],

  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60,
  },

  callbacks: {
    async signIn({ user, account }) {
      if (!adminDb) return false

      if (account?.provider === 'google') {
        const userDoc = await adminDb.collection('users').doc(user.id).get()

        if (!userDoc.exists()) {
          await adminDb
            .collection('users')
            .doc(user.id)
            .set({
              email: user.email,
              name: user.name,
              photoURL: user.image,
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
        }
      }

      return true
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = (user as any).role || 'student'
        token.email = user.email
      }

      return token
    },

    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
        session.user.email = token.email as string
      }

      return session
    },
  },

  pages: {
    signIn: '/login',
    error: '/auth/error',
  },

  secret: process.env.NEXTAUTH_SECRET,
})

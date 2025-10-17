import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      id: 'firebase',
      name: 'Firebase',
      credentials: {
        idToken: { label: 'ID Token', type: 'text' },
        userId: { label: 'User ID', type: 'text' },
        email: { label: 'Email', type: 'text' },
        name: { label: 'Name', type: 'text' },
        role: { label: 'Role', type: 'text' },
        photoURL: { label: 'Photo URL', type: 'text' },
      },
      async authorize(credentials) {
        if (!credentials?.idToken) {
          return null
        }

        return {
          id: credentials.userId as string,
          email: credentials.email as string,
          name: credentials.name as string,
          role: credentials.role as string,
          image: credentials.photoURL as string || null,
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      authorization: {
        params: {
          prompt: 'select_account',
        },
      },
    }),
  ],

  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60,
  },

  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id
        token.role = (user as any).role || 'student'
        token.email = user.email
        token.provider = account?.provider
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

import NextAuth, { type NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'

// Prisma adapter for NextAuth, optional and can be removed
// import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from '../../../server/db/client'
import { env } from '../../../env/server.mjs'

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    signIn: async ({ user, account }) => {
      if (account?.provider === 'credentials') return true

      if (account?.provider === 'google') {
        const userWithGoogle = await prisma.user.findFirst({
          where: { email: user.email },
        })
        if (!userWithGoogle) {
          if ('id' in user || 'name' in user) {
            await prisma.user.create({
              data: {
                id: user.id,
                name: user.name,
                email: user.email,
                image: user.image,
              },
            })
          }
        }
      }
      return true
    },
    session: async ({ session, token }) => {
      if (session.user) {
        session.user.id = token.sub || ''
        // const userExist = prisma.user.findFirst({
        //   where: { email: session.user.email, id: token.sub },
        // })
        // if (!userExist) return null
      }

      return session
    },
  },
  // Configure one or more authentication providers
  // adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const res = await prisma.user.findFirst({
          where: { email: credentials?.email },
        })
        if (res?.password !== credentials?.password) return null
        const user = {
          id: res?.id,
          name: res?.name,
          email: res?.email,
          image: res?.image,
        }
        return user
      },
    }),
    // ...add more providers here
  ],
  pages: { signIn: '/sign-in', newUser: '/register' },
  session: { strategy: 'jwt' },
}

export default NextAuth(authOptions)

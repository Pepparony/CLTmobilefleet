// lib/auth.ts  (fleet.cltmobile.com)
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getFleetAccountByEmail } from './fleet';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Fleet Portal',
      credentials: {
        email:    { label: 'Email',    type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const account = await getFleetAccountByEmail(credentials.email);
        if (!account) return null;

        // Password is the fleet's access code stored on the account
        if (credentials.password !== account.accessCode) return null;

        return {
          id:          account._id,
          email:       account.contactEmail,
          name:        account.contactName,
          companyName: account.companyName,
          fleetId:     account._id,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.fleetId     = (user as any).fleetId;
        token.companyName = (user as any).companyName;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).fleetId     = token.fleetId;
        (session.user as any).companyName = token.companyName;
      }
      return session;
    },
  },

  pages: {
    signIn: '/login',
  },

  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  secret: process.env.NEXTAUTH_SECRET,
};
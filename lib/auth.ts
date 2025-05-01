import bcrypt from 'bcryptjs';
import NextAuth from 'next-auth';
import { Session, User } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';

import dbConnect from './dbConnect';
import UserModel from './models/UserModel';

export const config = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: {
          type: 'email',
        },
        password: {
          type: 'password',
        },
      },
      async authorize(credentials) {
        await dbConnect();
        if (credentials === null) return null;

        const user = await UserModel.findOne({ email: credentials.email });

        if (user) {
          const isMatch = await bcrypt.compare(
            credentials.password as string,
            user.password,
          );
          if (isMatch) {
            return user;
          }
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/signin',
    newUser: '/register',
    error: '/error',
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user && (user as any)._id) {
        token._id = (user as any)._id.toString();
        token.isAdmin = (user as any).isAdmin; // ✅ Include isAdmin
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token && session.user) {
        (session.user as any)._id = token._id;
        (session.user as any).isAdmin = token.isAdmin; // ✅ Include isAdmin
      }
      return session;
    },
  },
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(config);

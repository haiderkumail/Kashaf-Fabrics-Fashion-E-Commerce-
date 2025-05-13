import NextAuth from 'next-auth';
import type { NextAuthConfig } from 'next-auth';

const authConfig = {
  providers: [],
  callbacks: {
    authorized({ request, auth }: any) {
      const protectedPaths = [
        /\/profile/,
        // /\/order\/(.*)/,
        /\/admin/,
      ];
      const { pathname } = request.nextUrl;
      // Only protect true private routes like profile/admin/order
      if (protectedPaths.some((p) => p.test(pathname))) return !!auth;
      return true; // allow guest access to other routes
    },
  },
} satisfies NextAuthConfig;

export const { auth: middleware } = NextAuth(authConfig);

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

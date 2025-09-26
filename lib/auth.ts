import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db, users } from '@/lib/db';
import { eq } from 'drizzle-orm';

export const authOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(db),
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Simple admin check - in production, use proper password hashing
        if (
          credentials.email === process.env.ADMIN_EMAIL &&
          credentials.password === process.env.ADMIN_PASSWORD
        ) {
          // Check if admin user exists in database
          let adminUser = await db.select().from(users).where(eq(users.email, credentials.email));

          if (adminUser.length === 0) {
            // Create admin user if doesn't exist
            adminUser = await db.insert(users).values({
              email: credentials.email,
              name: 'Admin',
              role: 'admin'
            }).returning();
          }

          return {
            id: adminUser[0].id,
            email: adminUser[0].email,
            name: adminUser[0].name,
            role: adminUser[0].role
          };
        }

        return null;
      }
    })
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.role = (user as any).role;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session.user) {
        (session.user as any).id = token.sub;
        (session.user as any).role = token.role;
      }
      return session;
    }
  },
  pages: {
    signIn: '/admin/login'
  },
  session: {
    strategy: 'jwt'
  }
};
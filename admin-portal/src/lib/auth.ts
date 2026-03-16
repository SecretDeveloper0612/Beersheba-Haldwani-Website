import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { query } from "@/lib/db";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        // Default Admin login
        if (
          credentials.email === "website.beersheba@gmail.com" &&
          credentials.password === "Beersheba2026"
        ) {
          return {
            id: "default-admin-id",
            email: "website.beersheba@gmail.com",
            name: "Admin",
            role: "super_admin",
            image: null,
          };
        }

        // Fetch user from MySQL
        const users = (await query(
          "SELECT * FROM admin_users WHERE email = ? AND is_active = true LIMIT 1",
          [credentials.email.toLowerCase()]
        )) as any[];

        const user = users[0];

        if (!user) {
          throw new Error("Invalid email or password");
        }

        // Verify password
        const isValid = await bcrypt.compare(credentials.password, user.password_hash);
        if (!isValid) {
          throw new Error("Invalid email or password");
        }

        // Update last_login timestamp
        await query(
          "UPDATE admin_users SET last_login = CURRENT_TIMESTAMP WHERE id = ?",
          [user.id]
        );

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          image: user.avatar_url,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as { role?: string }).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { id?: string }).id = token.id as string;
        (session.user as { role?: string }).role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/",
    error: "/",
  },
  secret: process.env.NEXTAUTH_SECRET || "beersheba-fallback-secret-change-in-prod",
};

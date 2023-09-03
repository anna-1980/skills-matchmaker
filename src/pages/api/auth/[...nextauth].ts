import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        email: { label: "email", type: "text", placeholder: "jsmith@test.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const user = { id: "1", name: "Anna", email: "anna@test.com" };
        if (user) {
          if (
            credentials?.email === user.email &&
            credentials?.password === "test"
          ) {
            return user;
          } else {
            console.log("Invalid email or password");
            return null;
          }
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt(params) {
      if (params.user) {
      }
      return params.token;
    },
  },
};

export default NextAuth(authOptions);

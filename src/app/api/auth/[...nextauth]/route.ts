import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Simulate backend validation
        if (
          credentials?.email === "daniela@email.com" &&
          credentials?.password === "123456"
        ) {
          console.log("User authenticated");
          return { id: "1", name: "Test User", email: credentials.email };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
  },
});

export { handler as GET, handler as POST };

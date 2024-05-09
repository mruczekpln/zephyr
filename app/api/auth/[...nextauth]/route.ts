import bcrypt from "bcrypt";
import NextAuth, { AuthOptions } from "next-auth";
// @ts-ignore
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import GithubProvider, { GithubProfile } from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "./adapters/mongodb";
import { Credentials, User } from "@/types/index";
import getUser from "../../users/get";
import { Adapter } from "next-auth/adapters";

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: MongoDBAdapter(clientPromise, {
    databaseName: process.env.MONGODB_DB_NAME,
    collections: {
      Accounts: "accounts",
      Sessions: "sessions",
      Users: "users",
      VerificationTokens: "tokens",
    },
  }) as Adapter,
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }: any) {
      const userData = await getUser({ type: "by-id", id: token.sub });
      return { ...session, user: userData };
    },
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      // @ts-ignore
      profile(profile: GithubProfile) {
        return {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          password: null,
          image: profile.avatar_url,
          searches: [],
          favLocation: {
            name: "",
            count: 0,
          },
          settings: {
            unit: "metric",
          },
          createdAt: new Date().toString(),
          emailVerified: false,
        };
      },
    }),
    CredentialsProvider({
      credentials: {},
      async authorize(credentials: any) {
        const user = (await getUser({
          type: "login",
          email: credentials.email,
        })) as User;
        if (!user) return null;

        const isPasswordValid = await bcrypt.compare(
          (credentials as Credentials).password,
          user.password as string
        );
        if (!isPasswordValid) throw new Error("Wrong password!");

        return { ...user, id: user._id!.toString() };
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

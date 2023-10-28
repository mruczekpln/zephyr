import NextAuth, { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
// @ts-ignore
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import GithubProvider from "next-auth/providers/github";
import clientPromise from "./adapters/mongodb";

import bcrypt from "bcrypt";

import { User } from "@/lib/types";

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  adapter: MongoDBAdapter(clientPromise, {
    databaseName: "zephyr",
    collections: { Accounts: "accounts", Sessions: "sessions", Users: "users" },
  }),
  pages: {
    signIn: "/auth/signin",
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    // Credentials({
    //   id: "login",
    //   name: "Log in",
    //   credentials: {
    //     email: { label: "Email Adress", type: "email" },
    //     password: { label: "Password", type: "password" },
    //   },
    //   async authorize(credentials, req) {
    //     console.log("login");
    //     const client = await clientPromise;
    //     const db = client.db("zephyr");
    //     const users = db.collection<User>("users");

    //     credentials &&
    //       Object.values(credentials).forEach((credential) => {
    //         if (credential.trim() === "")
    //           throw new Error("You must fill every field");
    //       });

    //     const user = await users.findOne({ email: credentials?.email });
    //     console.log(user);
    //     if (!user) throw new Error("Couldn't find an user with this email.");

    //     const isPasswordValid = await bcrypt.compare(
    //       credentials?.password!,
    //       user.password
    //     );
    //     if (!isPasswordValid) throw new Error("Wrong password!");

    //     return {
    //       id: user._id.toString(),
    //       ...user,
    //     };
    //   },
    // }),
    // Credentials({
    //   id: "create-account",
    //   name: "Create account",
    //   credentials: {
    //     name: { label: "Username" },
    //     email: { label: "Email Adress", type: "email" },
    //     password: { label: "Password", type: "password" },
    //   },
    //   async authorize(credentials, req) {
    //     console.log("register");
    //     const client = await clientPromise;
    //     const db = client.db("zephyr");
    //     const users = db.collection<User>("users");

    //     credentials &&
    //       Object.values(credentials).forEach((credential) => {
    //         if (credential.trim() === "")
    //           throw new Error("You must fill every field");
    //       });

    //     const user = await users.findOne({ email: credentials?.email });
    //     if (user) throw new Error("This email adress is already in use!");
    //     else {
    //       const password = await bcrypt.hash(credentials?.password!, 10);
    //       users.insertOne({
    //         name: credentials?.name!,
    //         email: credentials?.email!,
    //         password: password!,
    //         searches: [],
    //         settings: {
    //           unit: "metric",
    //         },
    //       });
    //     }

    //     return null;
    //   },
    // }),
  ],
  // ...add more providers here
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

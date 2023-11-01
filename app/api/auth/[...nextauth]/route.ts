import { FieldValues } from 'react-hook-form'
import bcrypt from 'bcrypt'
import NextAuth, { AuthOptions, Profile, Session } from 'next-auth'
// @ts-ignore
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import GithubProvider, { GithubProfile } from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import clientPromise from './adapters/mongodb'
import { Credentials, SessionData, User } from '@/lib/types'
import { ObjectId } from 'mongodb'

export const authOptions: AuthOptions = {
	secret: process.env.NEXTAUTH_SECRET,
	adapter: MongoDBAdapter(clientPromise, {
		databaseName: 'zephyr',
		collections: { Accounts: 'accounts', Sessions: 'sessions', Users: 'users', VerificationTokens: 'tokens' }
	}),
	pages: {
		signIn: '/auth/signin'
	},
	session: {
		strategy: 'jwt'
	},
	callbacks: {
		async session({ session, user, token }: any) {
			// const res = await fetch(`/api/users/get`, {
			// 	method: 'POST',
			// 	body: JSON.stringify({
			// 		by: 'id',
			// 		id: token.sub
			// 	}),
			// 	headers: {
			// 		'Content-Type': 'application/json'
			// 	}
			// })

			// const data = await res.json()
			const users = (await clientPromise).db('zephyr').collection('users')
			const userData = await users.findOne({ _id: new ObjectId(token.sub) })
			if (!userData) throw new Error("Couldn't find an user with this id.")
			console.log(userData)

			return { ...session, user: userData }
		}
	},
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID!,
			clientSecret: process.env.GITHUB_CLIENT_SECRET!,
			// @ts-ignore
			profile(profile: GithubProfile) {
				return {
					id: profile.id,
					githubProfileId: profile.id,
					name: profile.name,
					email: profile.email,
					password: null,
					image: profile.avatar_url,
					searches: [],
					favLocation: {
						name: '',
						count: 0
					},
					settings: {
						unit: 'metric'
					},
					createdAt: new Date().toString(),
					emailVerified: false
				}
			}
		}),
		CredentialsProvider({
			credentials: {},
			async authorize(credentials: any) {
				// const response = await fetch(`${process.env.NEXTAUTH_URL}/api/users/get`, {
				// 	method: 'POST',
				// 	body: JSON.stringify({
				// 		by: 'email',
				// 		email: credentials.email
				// 	}),
				// 	headers: {
				// 		'Content-Type': 'application/json'
				// 	}
				// })

				// if (response.status === 401) throw new Error("Couldn't find an account with this email.")

				// const user = await response.json()

				const users = (await clientPromise).db('zephyr').collection('users')
				const user = await users.findOne({ email: credentials.email }, { projection: { password: 1 } })
				if (!user) throw new Error("Couldn't find an user with this id.")

				console.log('user in credentials', user)

				const isPasswordValid = await bcrypt.compare((credentials as Credentials).password, user.password as string)
				if (!isPasswordValid) throw new Error('Wrong password!')

				return { id: user._id.toString(), ...user }
			}
		})
	]
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

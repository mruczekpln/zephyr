import bcrypt from 'bcrypt'
import NextAuth, { AuthOptions, Profile, Session } from 'next-auth'
// @ts-ignore
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import GithubProvider, { GithubProfile } from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import clientPromise from './adapters/mongodb'
import { Credentials, User } from '@/lib/types'
import { ObjectId } from 'mongodb'
import { JWT } from 'next-auth/jwt'

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
		jwt({ token }) {
			return token
		},
		// @ts-ignore
		async session({ session, user, token }: { session: { user: User }; user: User; token: JWT }) {
			if (user) {
				session.user.image = user.image
				session.user.searches = user.searches
				session.user.settings = user.settings
				session.user.createdAt = user.createdAt
				session.user.emailVerified = user.emailVerified
			} else {
				const users = (await clientPromise).db('zephyr').collection<User>('users')
				const user = await users.findOne({ _id: new ObjectId(token.sub) })

				session.user.image = user?.image as string
				session.user.searches = user?.searches as User['searches']
				session.user.settings = user?.settings as User['settings']
				session.user.createdAt = user?.createdAt as string
				session.user.emailVerified = user?.emailVerified as boolean
			}

			return session
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
					name: profile.name,
					email: profile.email,
					password: null,
					image: profile.avatar_url,
					searches: [],
					settings: {
						unit: 'metric'
					},
					createdAt: new Date().toString(),
					emailVerified: false
				} as User
			}
		}),
		CredentialsProvider({
			credentials: {},
			async authorize(credentials) {
				const users = (await clientPromise).db('zephyr').collection<User>('users')

				const user = await users.findOne({ email: (credentials as Credentials).email })
				if (!user) throw new Error("Couldn't find an user with this email.")
				const isPasswordValid = await bcrypt.compare((credentials as Credentials).password, user.password as string)
				if (!isPasswordValid) throw new Error('Wrong password!')

				return { id: user._id.toString(), ...user }
			}
		})
	]
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'

export const authOptions = {
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID!,
			clientSecret: process.env.GITHUB_CLIENT_SECRET!
		}),
		Credentials({
			credentials: {
				username: { label: 'Username' },
				password: { label: 'Password', type: 'password' }
			},
			async authorize(credentials, req) {
				const user = { id: 1, name: 'cytryneq95', email: 'cytryneq95@gmail.com' }

				return user
			}
		})
	]
	// ...add more providers here
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

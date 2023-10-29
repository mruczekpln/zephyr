import bcrypt from 'bcrypt'
import { User } from '@/lib/types'
import { NextResponse } from 'next/server'
import clientPromise from '../[...nextauth]/adapters/mongodb'

export async function POST(request: Request) {
	const credentials = await request.json()
	console.log('credentials', credentials)

	const users = (await clientPromise).db('zephyr').collection<User>('users')
	const user = await users.findOne({ name: credentials.name, email: credentials.email })
	if (user) return NextResponse.json({ redirect: false, message: 'This username or email is already in use!' })
	else {
		const hashedPassword = await bcrypt.hash(credentials.password, 10)

		await users.insertOne({
			name: credentials.name,
			email: credentials.email,
			password: hashedPassword,
			image: '',
			searches: [],
			settings: {
				unit: 'metric'
			},
			createdAt: new Date().toString(),
			emailVerified: false
		} as User)
	}

	return NextResponse.json({ redirect: true })
}

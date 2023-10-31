import bcrypt from 'bcrypt'
import { User } from '@/lib/types'
import { NextResponse } from 'next/server'
import clientPromise from '../../auth/[...nextauth]/adapters/mongodb'

export async function POST(request: Request) {
	const credentials = await request.json()
	console.log('credentials', credentials)

	const users = (await clientPromise).db('zephyr').collection('users')
	const user = await users.findOne({ name: credentials.name, email: credentials.email })
	if (user) return NextResponse.json({ redirect: false, message: 'This username or email is already in use!' })
	else {
		const hashedPassword = await bcrypt.hash(credentials.password, 10)

		const result = await users.insertOne({
			name: credentials.name as string,
			email: credentials.email as string,
			password: hashedPassword as string,
			image: '',
			favLocation: {
				name: '',
				count: 0
			},
			searches: [],
			settings: {
				unit: 'metric'
			},
			createdAt: new Date().toString(),
			emailVerified: false
		})

		return NextResponse.json(result)
	}
}

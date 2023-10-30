import { NextResponse } from 'next/server'
import clientPromise from '../../auth/[...nextauth]/adapters/mongodb'
import { ObjectId } from 'mongodb'

type RequestBody =
	| {
			by: 'id'
			id: string
	  }
	| {
			by: 'email'
			email: string
	  }

export async function POST(req: Request) {
	const body: RequestBody = await req.json()

	const users = (await clientPromise).db('zephyr').collection('users')
	let userQuery = {}
	if (body.by === 'email') userQuery = { email: body.email }
	else if (body.by === 'id') userQuery = { _id: new ObjectId(body.id) }

	const user = await users.findOne(userQuery, { projection: body.by === 'email' ? { password: 1 } : { password: 0 } })
	// console.log(body.by, user)
	if (!user) return NextResponse.json({ message: "Couldn't find an user with this id." }, { status: 401 })

	return NextResponse.json({ ...user }, { status: 202 })
}

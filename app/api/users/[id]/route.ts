import { NextResponse } from 'next/server'
import clientPromise from '../../auth/[...nextauth]/adapters/mongodb'
import { ObjectId } from 'mongodb'

export async function GET(req: Request, { params }: { params: { id: string } }) {
	const users = (await clientPromise).db('zephyr').collection('users')
	const user = await users.findOne({ _id: new ObjectId(params.id) })
	if (!user) return NextResponse.json({ message: "Couldn't find an user with this id." }, { status: 401 })

	return NextResponse.json({ user }, { status: 202 })
}

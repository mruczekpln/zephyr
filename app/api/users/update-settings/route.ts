import { NextResponse } from 'next/server'
import clientPromise from '../../auth/[...nextauth]/adapters/mongodb'
import { UserSettings } from '@/lib/types'
import { ObjectId } from 'mongodb'

type RequestBody = { id: string; unit: UserSettings }
export async function POST(req: Request) {
	const body: RequestBody = await req.json()
	console.log(body)

	const users = (await clientPromise).db('zephyr').collection('users')

	const update = {
		$set: {
			settings: {
				unit: body.unit
			}
		}
	}

	const result = await users.updateOne({ _id: new ObjectId(body.id) }, update)
	console.log(result)

	return NextResponse.json({ updated: true })
}

import { NextResponse } from 'next/server'
import clientPromise from '../../auth/[...nextauth]/adapters/mongodb'
import { ObjectId } from 'mongodb'
import { SessionData, User, UserFavLocation, UserSearches } from '@/lib/types'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'

function getFavLocation(searches: UserSearches) {
	const counts: any = {}
	searches.forEach(item => {
		counts[item.name] = (counts[item.name] || 0) + 1
	})

	const counted = Object.entries(counts).map(([name, count]) => ({ name, count })) as [{ name: string; count: number }]

	const maxOccurrences = Math.max(...counted.map(item => item.count))
	const maxObject = counted.find(item => item.count === maxOccurrences)

	return maxObject
}

type RequestBody = {
	id: string
	location: { name: string; query: string; lat: number; lon: number }
}

export async function POST(req: Request) {
	try {
		const body: RequestBody = await req.json()
		if (!body.id) return NextResponse.json({ message: 'No user id.' }, { status: 400 })

		const users = (await clientPromise).db('zephyr').collection('users')
		const user = await users.findOne({ _id: new ObjectId(body.id) })
		if (!user) return NextResponse.json({ message: "Couldn't find an user with this id." }, { status: 401 })

		const updatedSearches = [...user.searches]
		updatedSearches.push({
			name: body.location.name as string,
			query: body.location.query,
			date: new Date().toString()
		})

		const updatedFavLocation = getFavLocation(updatedSearches) as UserFavLocation

		const update = {
			$set: {
				searches: updatedSearches,
				favLocation: updatedFavLocation
			}
		}

		const result = await users.updateOne({ _id: new ObjectId(body.id) }, update)
		console.log(result)

		return NextResponse.json(result)
	} catch (error: any) {
		console.log('error', error)
		return NextResponse.json(error)
	}
}

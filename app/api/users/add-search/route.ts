import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'
import { NextResponse } from 'next/server'
import clientPromise from '../../auth/[...nextauth]/adapters/mongodb'
import { ObjectId, WithId } from 'mongodb'
import { User, UserFavLocation, UserSearches } from '@/lib/types'

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

export async function POST(req: Request) {
	try {
		const data = await req.json()
		if (!data.id) return NextResponse.json({ message: 'No user id.' }, { status: 400 })
		console.log(data)

		const users = (await clientPromise).db('zephyr').collection<User>('users')
		const user = await users.findOne({ _id: new ObjectId(data.id) })
		if (!user) return NextResponse.json({ message: "Couldn't find an user with this id." }, { status: 401 })
		console.log(user)
		console.log('counted', getFavLocation(user.searches))

		let updatedUser = { ...user }
		const updatedSearches = [...user.searches]
		updatedSearches.push({ name: data.location.name as string, date: new Date().toString() })
		// if (user.searches.length === 0 && user.favLocation.name === '') {
		// 	updatedUser.favLocation = { name: data.location.name as string, count: 1 }
		// } else if (user?.favLocation.name === data.location.name) {
		// 	updatedUser.favLocation = { ...user?.favLocation, count: (user?.favLocation.count as number) + 1 }
		// } else {
		// }

		updatedUser = { ...updatedUser, searches: updatedSearches }
		updatedUser.favLocation = getFavLocation(updatedUser.searches) as UserFavLocation
		const { _id, ...updatedUserWithoutID } = updatedUser

		console.log('updated', updatedUser)

		const result = await users.replaceOne({ _id: new ObjectId(data.id) }, updatedUserWithoutID)
	} catch (error) {
		console.log('error', error)
	}
	return NextResponse.json({ 'a a a a ': true })
}

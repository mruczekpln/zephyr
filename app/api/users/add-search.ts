import { UserSearches, UserFavLocation } from '@/types'
import { Collection, ObjectId } from 'mongodb'
import { User } from '@/types/index'
import getUser from './get'

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

export default async function addSearch(
	id: string,
	location: { name: string; query: string; lat: number; lon: number }
) {
	const [user, users] = (await getUser({ type: 'by-id', id }, true)) as [user: User, users: Collection<User>]
	if (!user) throw new Error("Couldn't find an user with this id.")

	const updatedSearches = [...user.searches]
	updatedSearches.unshift({
		name: location.name as string,
		query: location.query,
		date: new Date().toString()
	})

	const updatedFavLocation = getFavLocation(updatedSearches) as UserFavLocation

	const update = {
		$set: {
			searches: updatedSearches,
			favLocation: updatedFavLocation
		}
	}

	const result = await users.updateOne({ _id: new ObjectId(id) }, update)
	console.log(result)
}

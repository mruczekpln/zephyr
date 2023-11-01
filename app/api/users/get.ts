import { Collection, ObjectId, WithId } from 'mongodb'
import UsersCollection from './users-collection'
import { User } from '@/types/index'

// type GetUser = (args: Args, returnCollection: boolean) => Promise<[user: User, users: Collection<User>]> | Promise<User>
// | ((args: Args, returnCollection: false) => )

type Args = { type: 'login'; email: string } | { type: 'by-id'; id: string }
const getUser = async (args: Args, returnCollection: boolean = false) => {
	const users = await UsersCollection()
	let user: User
	if (args.type === 'login') {
		user = (await users.findOne({ email: args.email }, { projection: { password: 1 } })) as WithId<User>
		if (!user) throw new Error("Couldn't find an user with this email adress.")
	} else {
		user = (await users.findOne(
			{ _id: new ObjectId(args.id) },
			{ projection: { password: 0, email: 0, emailVerified: 0 } }
		)) as WithId<User>
		if (!user) throw new Error("Couldn't find an user with this id.")
	}

	if (!returnCollection) return user as User
	else return [user, users] as [user: User, users: Collection<User>]
	// as [user: User, users: Collection<User>]
	// as User
}

export default getUser

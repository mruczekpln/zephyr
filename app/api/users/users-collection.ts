import { User } from '@/types/index'
import clientPromise from '../auth/[...nextauth]/adapters/mongodb'
import { Collection } from 'mongodb'

export default async function UsersCollection(): Promise<Collection<User>> {
	return (await clientPromise).db('zephyr').collection('users')
}

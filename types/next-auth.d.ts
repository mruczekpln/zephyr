import { DefaultSession } from 'next-auth'
import { SessionData } from '@/lib/types'
import { WithId } from 'mongodb'
import { User as UserData } from '@/types/index'
declare module 'next-auth' {
	interface User extends UserData, { _id: string } {}

	interface Session {
		user: {} & SessionData
		expires: string
	}
}

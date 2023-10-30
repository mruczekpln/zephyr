'use client'

import { Avatar } from '@/components/ui/avatar'
import Image from 'next/image'
import { Ruler, UserCircle2 } from 'lucide-react'
import { getServerSession } from 'next-auth'
import { Card, CardContent } from '@/components/ui/card'
import { authOptions } from '../../api/auth/[...nextauth]/route'
import { getSession, useSession } from 'next-auth/react'
import AccountLoading from './loading'
import { SessionData } from '@/lib/types'

export default function Account() {
	const { data, status } = useSession({ required: true })
	const user = data?.user as SessionData

	return (
		<div className='flex gap-8'>
			<div className='flex flex-col items-center gap-16 h-full w-full'>
				{status === 'loading' && <AccountLoading></AccountLoading>}
				{status === 'authenticated' && (
					<>
						<Avatar className='w-32 h-32 outline outline-offset-8 outline-black'>
							{user.image ? <Image src={user.image || 'o'} alt='' fill></Image> : <UserCircle2 size={64}></UserCircle2>}
						</Avatar>
						<h1 className='text-6xl font-title w-max'>Hello, {user?.name}!</h1>
						<Card>
							<CardContent className='flex gap-8 items-center p-6'>
								<div className='flex flex-col items-center'>
									<h1 className='text-5xl font-extrabold'>{user.searches.length}</h1>
									<p>Total Searches</p>
								</div>
								<div className='flex flex-col items-center'>
									<h1 className='text-3xl font-extrabold'>
										{user.favLocation.name.length > 30 ? user.favLocation.name.split(',')[0] : user.favLocation.name}
									</h1>
									<p>Favorite Location</p>
								</div>
							</CardContent>
						</Card>
					</>
				)}
			</div>
		</div>
	)
}

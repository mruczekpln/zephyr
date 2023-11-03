'use client'

import { Bird, UserCircle2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useSession } from 'next-auth/react'
import { Skeleton } from '@/components/ui/skeleton'
import NavigationDropdown from './navigation-dropdown'
import AuthLink from './auth-link'
import { SessionData } from '@/types/index'

export default function Navigation() {
	const { data, status } = useSession()
	const session: SessionData = data?.user as SessionData

	let content
	if (status === 'unauthenticated')
		content = (
			<>
				<AuthLink href='/auth/signin'>
					<Button>Sign in</Button>
				</AuthLink>
				<AuthLink href='/auth/login'>
					<Button variant={'outline'}>Log in</Button>
				</AuthLink>
			</>
		)
	else if (status === 'loading')
		content = (
			<>
				<Skeleton className='h-4 w-24'></Skeleton>
				<Skeleton className='h-10 w-10 rounded-full'></Skeleton>
			</>
		)
	else if (status === 'authenticated')
		content = (
			<>
				<NavigationDropdown userName={session.name}></NavigationDropdown>
				<Avatar className='items-center'>
					{(session.image && <Image src={session.image} alt='' fill></Image>) || <UserCircle2 size={64}></UserCircle2>}
				</Avatar>
			</>
		)

	return (
		<div
			className={`flex items-center h-auto top-16 w-screen max-w-screen overflow-x-hidden px-20 mx-auto z-10 absolute`}
		>
			<Link
				href={'/'}
				className='text-xl flex gap-2 items-center hover:bg-primary/20 px-4 rounded-xl transition-colors duration-200'
				prefetch={false}
			>
				<Bird color='black' size={32} />
				<p className=''>zephyr </p>
			</Link>
			<div className='grow-[2] flex justify-end'>
				<div className=' flex gap-4 items-center'>{content}</div>
			</div>
		</div>
	)
}

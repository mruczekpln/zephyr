import { SessionProvider } from 'next-auth/react'

import { Avatar } from '@/components/ui/avatar'
import Image from 'next/image'
import { Ruler, UserCircle2 } from 'lucide-react'
import { getServerSession } from 'next-auth'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'

export default async function Account() {
	const session = await getServerSession()

	return (
		<div className='flex gap-8'>
			<div className='flex flex-col items-center gap-16 h-full w-full'>
				<Avatar className='w-32 h-32 outline outline-offset-8 outline-black'>
					{<Image src={session!.user!.image || 'o'} alt='' fill></Image> || <UserCircle2 size={64}></UserCircle2>}
				</Avatar>
				<h1 className='text-6xl font-title w-max'>Hello, {session?.user?.name}!</h1>
				<Card>
					<CardContent className='flex gap-8 items-center p-6'>
						<div className='flex flex-col items-center'>
							<h1 className='text-5xl font-extrabold'>2</h1>
							<p>Total Searches</p>
						</div>
						<div className='flex flex-col items-center'>
							<h1 className='text-3xl font-extrabold'>Zielona Gora</h1>
							<p>Favorite Location</p>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}

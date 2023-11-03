'use client'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { usePathname, useRouter } from 'next/navigation'
import { ReactNode } from 'react'

export default function AccountLayout({ children }: { children: ReactNode }) {
	const router = useRouter()
	const pathname = usePathname()
	const childRoute = pathname.split('/').pop()

	return (
		<div className='w-full min-h-screen flex flex-col items-center pt-20 gap-16 bg-gradient-to-b from-foreground/50 to-white'>
			<Tabs defaultValue={childRoute} className='z-50'>
				<TabsList className='grid grid-cols-3 z-50'>
					<TabsTrigger value='info' onClick={() => router.push('/account/info')}>
						Your Account
					</TabsTrigger>
					<TabsTrigger value='history' onClick={() => router.push('/account/history')}>
						History
					</TabsTrigger>
					<TabsTrigger value='settings' onClick={() => router.push('/account/settings')}>
						Settings
					</TabsTrigger>
				</TabsList>
			</Tabs>

			{children}
		</div>
	)
}

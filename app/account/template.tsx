'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useParams, usePathname, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

export default function AccountLayout({ children }: { children: React.ReactNode }) {
	const router = useRouter()
	const pathname = usePathname()
	const childRoute = pathname.split('/').pop()
	console.log(childRoute)

	return (
		<div className='w-full min-h-screen flex flex-col items-center pt-48  gap-16'>
			<Tabs defaultValue={childRoute}>
				<TabsList className='grid grid-cols-3'>
					<TabsTrigger value='account' onClick={() => router.push('/account')}>
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

'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useParams, usePathname, useRouter } from 'next/navigation'
import React, { Suspense, useEffect } from 'react'
import HistoryLoading from './history/loading'
import AccountLoading from './info/loading'
import SettingsLoading from './settings/loading'
import { useSession } from 'next-auth/react'

export default function AccountLayout({ children }: { children: React.ReactNode }) {
	const router = useRouter()
	const pathname = usePathname()
	const childRoute = pathname.split('/').pop()

	return (
		<div className='w-full min-h-screen flex flex-col items-center pt-20 gap-16'>
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

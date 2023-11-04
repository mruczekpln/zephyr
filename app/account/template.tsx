'use client'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Image from 'next/image'
import AccountPageBg from '@/public/account-page-bg.svg'
import { usePathname, useRouter } from 'next/navigation'
import { ReactNode } from 'react'

export default function AccountLayout({ children }: { children: ReactNode }) {
	const router = useRouter()
	const pathname = usePathname()
	const childRoute = pathname.split('/').pop()

	return (
		<div
			className='min-h-screen flex flex-col items-center pt-[68px] gap-16 w-screen'
			style={{
				backgroundImage: `url(${AccountPageBg.src})`,
				backgroundAttachment: 'fixed',
				backgroundSize: '100vw auto',
				backgroundRepeat: 'no-repeat',
				backgroundBlendMode: 'lighten'
			}}
		>
			<Tabs defaultValue={childRoute} className='z-50 '>
				<TabsList className='grid grid-cols-3 z-50 bg-foreground [&>*]:text-white'>
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

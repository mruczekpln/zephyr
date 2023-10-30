'use client'

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Ruler } from 'lucide-react'
import { getSession, useSession } from 'next-auth/react'
import SettingsLoading from './loading'
import { SessionData } from '@/lib/types'
import { useEffect, useRef, useState } from 'react'
import { Session } from 'next-auth'

async function updateSetting(id: string, to: string) {
	const res = await fetch('/api/users/update-settings', {
		method: 'POST',
		body: JSON.stringify({
			id: id,
			unit: to
		}),
		headers: {
			'Content-Type': 'application/json'
		}
	})

	const data = await res.json()

	return null
}

export default function Settings() {
	// const { data, status } = useSession({ required: true })
	// const user = data?.user as SessionData
	// console.log(user)

	const [sessionData, setSessionData] = useState({} as Session)
	const user = sessionData && (sessionData.user as SessionData)

	useEffect(() => {
		getSession().then(res => setSessionData(res!))
	}, [])

	useEffect(() => {
		if (sessionData.user) setUnit(sessionData.user.settings.unit)
	}, [sessionData])

	const [unit, setUnit] = useState('')
	const [buttonText, setButtonText] = useState<string>('Update preferences')

	return (
		<div className='flex flex-col w-1/2  h-full gap-8'>
			<h1 className='text-6xl font-title w-max'>Settings</h1>
			{/* {status === 'loading' && <SettingsLoading></SettingsLoading>} */}
			{/* {status === 'authenticated' && ( */}
			{user && (
				<Card>
					<CardHeader>
						<CardTitle>Preferences</CardTitle>
						<CardDescription>Manage your profile preferences here.</CardDescription>
					</CardHeader>
					<CardContent>
						<div className='flex gap-4'>
							<Ruler size={48} className='w-16'></Ruler>
							<div className='w-max grow whitespace-nowrap'>
								<h3 className='font-medium'>Unit Set</h3>
								<h3 className='text-sm text-muted-foreground'>Metric or imperial.</h3>
							</div>
							<Select onValueChange={data => setUnit(data as 'metric' | 'imperial')} defaultValue={user.settings.unit}>
								<SelectTrigger
									className='w-48 ml-auto'
									disabled={buttonText === 'Successfully saved your preferences!'}
								>
									<SelectValue
										placeholder={user.settings.unit === 'metric' ? 'Metric, KM (C°, m/s)' : 'Imperial, MI (F°, mph)'}
									></SelectValue>
								</SelectTrigger>
								<SelectContent>
									<SelectItem value='metric'>Metric, KM (C°, m/s)</SelectItem>
									<SelectItem value='imperial'>Imperial, MI (F°, mph)</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<Separator className='my-4'></Separator>
					</CardContent>
					<CardFooter>
						<Button
							variant={buttonText === 'Successfully saved your preferences!' ? 'ghost' : 'default'}
							disabled={
								buttonText !== 'Update preferences' || JSON.stringify(unit) === JSON.stringify(user.settings.unit)
							}
							onClick={async () => {
								console.log(unit, user.settings.unit)
								if (JSON.stringify(unit) !== JSON.stringify(user.settings.unit)) {
									setButtonText('Updating')
									await updateSetting(user._id, unit)
									setButtonText('Successfully saved your preferences!')
								}
							}}
							className='w-full'
						>
							{buttonText}
						</Button>
					</CardFooter>
				</Card>
			)}
		</div>
	)
}

'use client'

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Ruler, Satellite } from 'lucide-react'
import { getSession, useSession } from 'next-auth/react'
import SettingsLoading from './loading'
import { SessionData, User, UserSettings } from '@/lib/types'
import { useEffect, useRef, useState } from 'react'
import { Session } from 'next-auth'
import { statSync } from 'fs'

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
const formStates: {
	text: string
	buttonDisabled: boolean
	selectDisabled: boolean
	variant: 'default' | 'ghost' | 'link' | 'destructive' | 'outline' | 'secondary' | null | undefined
}[] = [
	{
		text: 'Save preferences.',
		buttonDisabled: true,
		selectDisabled: false,
		variant: 'default'
	},
	{
		text: 'Save preferences.',
		buttonDisabled: false,
		selectDisabled: false,
		variant: 'default'
	},
	{
		text: 'Updating...',
		buttonDisabled: true,
		selectDisabled: true,
		variant: 'ghost'
	},
	{
		text: 'Successfully saved your preferences!',
		buttonDisabled: true,
		selectDisabled: true,
		variant: 'ghost'
	}
]

type State = { formState: number; unit: UserSettings['unit'] }
export default function Settings() {
	const [sessionData, setSessionData] = useState({} as Session)
	const user: User = sessionData.user as User

	useEffect(() => {
		getSession().then(res => setSessionData(res!))
	}, [])

	useEffect(() => {
		if (user) setState(prev => ({ ...prev, unit: user.settings.unit }))
	}, [sessionData])

	const [state, setState] = useState<State>({ formState: 0 } as State)

	return (
		<div className='flex flex-col w-1/2  h-full gap-8'>
			<h1 className='text-6xl font-title w-max'>Settings</h1>
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
							<Select
								onValueChange={(data: UserSettings['unit']) => setState(prev => ({ formState: 1, unit: data }))}
								defaultValue={user.settings.unit}
							>
								<SelectTrigger
									className='w-48 ml-auto'
									disabled={formStates[state.formState].selectDisabled}
									//  'Successfully saved your preferences!'
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
							variant={formStates[state.formState].variant}
							disabled={formStates[state.formState].buttonDisabled}
							onClick={async () => {
								if (JSON.stringify(state.unit) !== JSON.stringify(user.settings.unit)) {
									setState(prev => ({ ...prev, formState: 2 }))
									await updateSetting(user._id, state.unit)
									setState(prev => ({ ...prev, formState: 3 }))
								}
							}}
							className='w-full'
						>
							{formStates[state.formState].text}
						</Button>
					</CardFooter>
				</Card>
			)}
		</div>
	)
}

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Ruler } from 'lucide-react'

export default async function Settings() {
	await new Promise(res => setTimeout(() => res('res'), 1000))

	return (
		<div className='flex flex-col w-1/2  h-full gap-8'>
			<h1 className='text-6xl font-title w-max'>Settings</h1>
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
						<Select>
							<SelectTrigger className='w-48 ml-auto'>
								<SelectValue placeholder='Distance unit'></SelectValue>
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
					<Button variant='secondary' className='w-full'>
						Save preferences
					</Button>
				</CardFooter>
			</Card>
		</div>
	)
}

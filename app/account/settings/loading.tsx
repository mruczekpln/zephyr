import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'

export default function SettingsLoading() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>
					<Skeleton className='h-8 w-24'></Skeleton>
				</CardTitle>
				<CardDescription>
					<Skeleton className='h-4 w-48'></Skeleton>
				</CardDescription>
			</CardHeader>
			<CardContent className='w-full'>
				<div className='flex gap-4'>
					<Skeleton className='h-14 w-14 rounded-full'></Skeleton>
					<div className='w-max grow whitespace-nowrap'>
						<Skeleton className='h-5 w-24 mb-2'></Skeleton>
						<Skeleton className='h-4 w-32'></Skeleton>
					</div>
					<Skeleton className='h-10 w-48'></Skeleton>
				</div>
				<Separator className='my-4'></Separator>
			</CardContent>
			<CardFooter>
				<Skeleton className='h-10 w-full'></Skeleton>
			</CardFooter>
		</Card>
	)
}

import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function AccountLoading() {
	return (
		<div className='flex gap-8'>
			<div className='flex flex-col items-center gap-16 h-full w-full'>
				<Skeleton className='w-32 h-32 outline outline-offset-8 outline-black rounded-full'></Skeleton>
				<Skeleton className='h-20 w-[500px]'></Skeleton>
				<Card>
					<CardContent className='flex gap-8 items-center p-6'>
						<Skeleton className='h-24 w-80'></Skeleton>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}

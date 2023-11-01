import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { UserSearches } from '@/types/index'
import { ExternalLink, Search as SearchIcon } from 'lucide-react'
import Link from 'next/link'

type Props = { searchData: UserSearches[0] }
export default function HistorySearch({ searchData }: Props) {
	return (
		<Card className='w-full'>
			<CardHeader>
				<CardTitle>
					<SearchIcon className='inline'></SearchIcon> {searchData.query}
				</CardTitle>
				<CardDescription>{searchData.name}</CardDescription>
			</CardHeader>
			<CardContent className='flex justify-end items-center gap-4'>
				<Link href={`/in/${encodeURI(searchData.query)}`}>
					<Button>
						<h2 className='mr-2'>Go to</h2>
						<ExternalLink className='inline'></ExternalLink>
					</Button>
				</Link>
			</CardContent>
		</Card>
	)
}

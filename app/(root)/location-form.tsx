'use client'
import { ArrowDownRightSquare } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

type Props = { invalid?: string }
export default function LocationForm({ invalid }: Props) {
	const router = useRouter()

	return (
		<form
			onSubmit={e => {
				e.preventDefault()
				const {
					location: { value }
				} = e.target as typeof e.target & {
					location: { value: string }
				}
				router.push(`/in/${value}`)
			}}
			className='w-full h-full flex gap-4'
		>
			<Input
				placeholder={invalid === 'true' ? 'invalid location' : 'city, location'}
				name='location'
				className={`h-full ${invalid === 'true' && 'placeholder:font-bold'}`}
				required
			></Input>
			<Button type='submit' className='grow h-full aspect-square'>
				<ArrowDownRightSquare></ArrowDownRightSquare>
			</Button>
		</form>
	)
}

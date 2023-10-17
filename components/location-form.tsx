'use client'
import { ArrowDownRightSquare } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Input } from './ui/input'
import { Button } from './ui/button'

export default function LocationForm() {
	const router = useRouter()

	return (
		<form
			onSubmit={e => {
				e.preventDefault()
				router.push(`/in/${e.target['location'].value}`)
			}}
			className='w-full h-full flex gap-4'
		>
			<Input placeholder='city, location' name='location' className='h-full' required></Input>
			<Button type='submit' className='grow h-full aspect-square'>
				<ArrowDownRightSquare></ArrowDownRightSquare>
			</Button>
		</form>
	)
}

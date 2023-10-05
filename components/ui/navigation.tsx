import { Bird, Moon } from 'lucide-react'
import { Button } from './button'

export default function Navigation() {
	return (
		<div className='flex items-center h-20 absolute w-screen overflow-x-hidden px-8'>
			<div className='text-xl flex gap-2 items-center'>
				<Bird color='black' size={32} />
				<p>zephyr </p>
			</div>
			<div className='grow-[2] flex justify-end'>
				<div className=' flex gap-4 items-center'>
					<Button className='w-8 h-8 bg-transparent hover:bg-gray-300'>
						<Moon color='black' className='absolute' />
						{/* but */}
					</Button>
					<div className='w-10 aspect-square bg-black rounded-full'></div>
				</div>
			</div>
		</div>
	)
}

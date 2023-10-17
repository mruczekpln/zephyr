import { Bird, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import ThemeSwitch from './theme-switch'
import { Button } from './ui/button'

export default function Navigation() {
	return (
		<div className='flex items-center h-auto top-16 w-full max-w-screen overflow-x-hidden px-20 mx-auto z-10 absolute'>
			<Link href={'/'} className='text-xl flex gap-2 items-center'>
				<Bird color='black' size={32} />
				<p>zephyr </p>
			</Link>
			<ul></ul>
			<div className='grow-[2] flex justify-end'>
				<div className=' flex gap-4 items-center'>
					<ThemeSwitch></ThemeSwitch>
					<div className='w-10 aspect-square bg-black rounded-full'></div>
				</div>
			</div>
		</div>
	)
}

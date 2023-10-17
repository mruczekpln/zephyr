'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from './ui/button'

export default function ThemeSwitch() {
	const { setTheme, theme } = useTheme()

	return (
		<Button
			className='w-8 h-8 bg-transparent hover:bg-gray-300'
			onClick={() => (theme === 'light' ? setTheme('dark') : setTheme('light'))}
		>
			{theme === 'light' ? <Moon color='black' className='absolute' /> : <Sun color='white' className='absolute'></Sun>}
			{/* but */}
		</Button>
	)
}

import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navigation from '@/components/navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Zephyr',
	description: 'Put the jacket on!'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en' className='overflow-x-hidden max-w-[100vw]'>
			<body className={`${inter.className} max-w-[100vw]`}>
				<Navigation></Navigation>
				{children}
			</body>
		</html>
	)
}

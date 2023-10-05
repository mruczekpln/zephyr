import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import MainContent from '@/components/ui/main-content'
import Navigation from '@/components/ui/navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Zephyr',
	description: 'Put the jacket on!'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<Navigation></Navigation>
				{children}
			</body>
		</html>
	)
}

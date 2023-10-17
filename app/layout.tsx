import '@/styles/globals.css'
import type { Metadata } from 'next'
import Navigation from '@/components/navigation'

import { Inter } from 'next/font/google'
import { DM_Serif_Display } from 'next/font/google'
import { ThemeProvider } from '@/components/ui/theme-provider'

const inter = Inter({ subsets: ['latin'], variable: '--font-main' })
const titleFont = DM_Serif_Display({ subsets: ['latin'], weight: '400', variable: '--font-title' })

export const metadata: Metadata = {
	title: 'Zephyr',
	description: 'Put the jacket on!'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en' className='overflow-x-hidden max-w-[100vw]'>
			<body className={`${inter.variable} ${titleFont.variable} font-main max-w-[100vw] w-screen min-h-screen h-auto`}>
				{/* <ThemeProvider attribute='class' defaultTheme='light' enableSystem disableTransitionOnChange> */}
				<Navigation></Navigation>
				{children}
				{/* </ThemeProvider> */}
			</body>
		</html>
	)
}

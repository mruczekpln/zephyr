'use client'

import '@/styles/globals.css'

import { Inter } from 'next/font/google'
import { DM_Serif_Display } from 'next/font/google'
import { SessionProvider } from 'next-auth/react'
import Head from 'next/head'
import Navigation from './(root)/layout-components/navigation'

const inter = Inter({
	subsets: ['latin'],
	variable: '--font-main'
})
const titleFont = DM_Serif_Display({
	subsets: ['latin'],
	weight: '400',
	variable: '--font-title'
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<SessionProvider>
			<html lang='en' className={`overflow-x-hidden max-w-[100vw] ${titleFont.variable} ${inter.variable} `}>
				<Head>
					<title>Zephyr</title>
				</Head>
				<body className={`font-main max-w-[100vw] w-screen min-h-screen h-auto`}>
					<Navigation></Navigation>
					{children}
				</body>
			</html>
		</SessionProvider>
	)
}

'use client'

import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { Session, getServerSession } from 'next-auth'
import { getSession, useSession } from 'next-auth/react'
import HistoryLoading from './loading'
import { SessionData } from '@/lib/types'
import HistorySearch from './history-search'
import { useEffect, useState } from 'react'

export default function History() {
	const [sessionData, setSessionData] = useState({} as Session)
	const user = sessionData && (sessionData.user as SessionData)

	useEffect(() => {
		const session = getSession().then(res => setSessionData(res!))
	}, [])

	return (
		<div className='flex flex-col items-center gap-8'>
			{/* {status === 'loading' && <HistoryLoading></HistoryLoading>} */}
			{user && (
				<>
					<h1 className='font-title text-5xl leading-relaxed'>
						History of your searches, <u>{user?.name}</u>.
					</h1>
					<div className='grid grid-cols-1 w-[600px] gap-8 place-items-center'>
						{user.searches.length > 0 ? (
							user.searches.map((search, index) => <HistorySearch searchData={search} key={index}></HistorySearch>)
						) : (
							<h2 className='text-4xl text-muted-foreground font-bold'>I guess you&apos;ve gotta fill this up!</h2>
						)}
					</div>
				</>
			)}
		</div>
	)
}

'use client'

import { WeatherData } from '@/types/index'
import { ArrowDownFromLine, ArrowUpFromLine, Cloud, Cloudy, Gauge } from 'lucide-react'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { useEffect, useState } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

async function fetchSnippetData() {
	const response = await fetch(`/api/weather/get-snippet`, { next: { revalidate: 60 } })
	const data = await response.json()
	console.log(data)

	return data
}

export default function WeatherSnippet() {
	const [data, setData] = useState<WeatherData>({} as WeatherData)

	useEffect(() => {
		fetchSnippetData().then(snippetData => setData(snippetData))
	}, [])

	const current = data.currentConditions

	return (
		<Card className='row-span-3 col-span-3'>
			<CardContent className='h-full flex flex-col justify-between'>
				<CardTitle className='font-title text-3xl py-4'>CURRENT WEATHER IN: &quot;Warsaw&quot;</CardTitle>
				{data.currentConditions ? (
					<>
						<div className='flex items-center gap-2'>
							<span className='text-5xl'>{current.temp}</span>
							<ArrowDownFromLine />
							<p className='text-3xl font-semibold'>{Math.round(data.days[0].tempmin)}</p>
							<ArrowUpFromLine />
							<p className='text-3xl font-semibold'>{Math.round(data.days[0].tempmax)}</p>
							<p className='text-lg'>Celsius</p>
						</div>
						<div className='flex items-center justify-between mt-4'>
							<div>
								<p className='text-xl mt-4'>Visibility: {current.visibility}%</p>
								<p className='text-xl'>Humidity: {current.humidity}%</p>
							</div>
							<div className='flex flex-col items-center'>
								<Cloudy size={48}></Cloudy>
								<p>
									<b>{current.cloudcover}</b>%
								</p>
							</div>
							<div className='flex flex-col items-center'>
								<Gauge size={48}></Gauge>
								<p>
									<b>{current.pressure}</b> Hpa
								</p>
							</div>
						</div>
					</>
				) : (
					<>
						<Skeleton className='h-20 w-32'></Skeleton>
					</>
				)}
			</CardContent>
		</Card>
	)
}

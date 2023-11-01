import { WeatherData } from '@/types/index'
import { ArrowDownFromLine, ArrowUpFromLine, Cloud, Cloudy, Gauge } from 'lucide-react'
import { env } from 'process'
import { Card, CardContent, CardTitle } from '@/components/ui/card'

export default async function WeatherSnippet() {
	const reponse = await fetch(
		`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/warsaw/today?unitGroup=metric&key=${env.WEATHER_API_KEY}&include=current&lang=id&contentType=json`,
		{ next: { revalidate: 600 } }
	)

	const data: WeatherData = await reponse.json()
	const current = data.currentConditions

	return (
		<Card className='row-span-3 col-span-3'>
			<CardContent className='h-full flex flex-col justify-between'>
				<CardTitle className='font-title text-3xl py-4'>Current weather in: &quot;Warsaw&quot;</CardTitle>
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
			</CardContent>
		</Card>
	)
}

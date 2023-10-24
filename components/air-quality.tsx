import { AqiData } from '@/lib/types'
import { getMessageByAqi } from '@/lib/utils/aqi'
import { CornerRightDown } from 'lucide-react'
import { useState } from 'react'
import { Card, CardContent, CardTitle } from './ui/card'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'

async function getAQIData(lat: number, lon: number) {
	const token = process.env.WAQI_API_KEY
	try {
		const res = await fetch(`https://api.waqi.info/feed/warsaw/?token=${token}`)
		const data = await res.json()

		return data
	} catch (error) {
		return false
	}
}

type Props = { lat: number; lon: number }
export default async function AirQuality({ lat, lon }: Props) {
	const aqiData = await getAQIData(lat, lon)

	if (!aqiData)
		return (
			<Card>
				<CardContent className='flex items-center justify-center p-0 w-full h-full'>
					<h1 className='text-2xl font-title text-gray-500'>WAQI API ERROR</h1>
				</CardContent>
			</Card>
		)

	const { data }: AqiData = aqiData
	const currentMessage = getMessageByAqi(data.aqi)

	return (
		<Card className=''>
			<CardTitle className='font-title text-xl z-10 rounded-tl-xl rounded-xl p-2 px-3 tracking-wide bg-background'>
				AIR QUALITY INDEX
			</CardTitle>
			<CardContent className='flex flex-col items-start h-full px-3 gap-2'>
				<div className='flex gap-2 items-end'>
					<h2 className='text-xl font-bold leading-none underline decoration-green-600 decoration-double'>
						{currentMessage.grade}
					</h2>
					<Popover>
						<PopoverTrigger>
							<u className='inline text-sm leading-tight underline-offset-2'>more info</u>
							<CornerRightDown className='inline ml-2' size={12}></CornerRightDown>
						</PopoverTrigger>
						<PopoverContent className='w-auto'>
							<p>
								CO <i>Carbon Monoxide</i> (μg/m3) - <b>{String(data.iaqi['co'].v)}</b>
							</p>
							<p>
								O3 <i>Ozone</i> (μg/m3) - <b>{String(data.iaqi['o3'].v)}</b>
							</p>
							<p>
								NO2 <i>Nitrogen dioxide</i> (μg/m3) - <b>{String(data.iaqi['no2'].v)}</b>
							</p>
							<p>
								SO2 <i>Sulphur dioxide</i> (μg/m3) - <b>{String(data.iaqi['so2'].v)}</b>
							</p>
							<p>
								PM2.5 (μg/m3) - <b>{String(data.iaqi['pm25'].v)}</b>
							</p>
							<p>
								PM10 (μg/m3) - <b>{String(data.iaqi['pm10'].v)}</b>
							</p>
						</PopoverContent>
					</Popover>
				</div>
				<p className='text-sm'>
					INDEX - <span className='font-extrabold'>{data.aqi}</span> <br />
					LATITUDE - <span className='font-extrabold'>{data.city.geo[0]}</span> <br />
					LONGITUDE - <span className='font-extrabold'>{data.city.geo[1]}</span> <br />
					STATION - <span className='font-extrabold'>{data.city.name}</span>
				</p>
				<p className='leading-tight'>{currentMessage.text}</p>
			</CardContent>
		</Card>
	)
}

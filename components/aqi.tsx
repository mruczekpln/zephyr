import { AirQuality } from '@/app/in/[location]/page'
import { CornerRightDown, Divide } from 'lucide-react'
import { Card, CardContent, CardTitle } from './ui/card'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'

type Message = {
	range: number[]
	grade: string
	text: string
}

const messages: Message[] = [
	{
		range: [1, 2, 3],
		grade: 'Good',
		text: 'Enjoy your usual outdoor activities.'
	},
	{
		range: [4, 5, 6],
		grade: 'Moderate',
		text: 'Enjoy your usual outdoor activities.'
	},
	{
		range: [7, 8, 9],
		grade: 'Unhealthy',
		text: 'Anyone experiencing discomfort such as sore eyes, cough or sore throat should consider reducing activity, particularly outdoors.'
	},
	{
		range: [10],
		grade: 'Very Unhealthy',
		text: 'Reduce physical exertion, particularly outdoors, especially if you experience symptoms such as cough or sore throat.'
	}
]

type Props = { aqi: AirQuality }
export default function AirQualityIndex({ aqi }: Props) {
	const currentRange = messages.find(({ range }) => range.includes(aqi['gb-defra-index'])) || messages[0]

	return (
		<Card className=''>
			<CardTitle className='font-title text-xl z-10 rounded-tl-xl rounded-xl p-2 px-3 tracking-wide bg-background'>
				AIR QUALITY INDEX
			</CardTitle>
			<CardContent className='flex flex-col items-start h-full px-3 gap-2'>
				<div className='flex gap-2 items-end'>
					<h2 className='text-xl font-bold leading-none underline decoration-green-600 decoration-double'>
						{currentRange.grade}
					</h2>
					<Popover>
						<PopoverTrigger>
							<u className='inline text-sm leading-tight underline-offset-2'>more info</u>
							<CornerRightDown className='inline ml-2' size={12}></CornerRightDown>
						</PopoverTrigger>
						<PopoverContent className='w-auto'>
							<p>
								CO - Carbon Monoxide (μg/m3) - <b>{aqi.co}</b>
							</p>
							<p>
								O3 - Ozone (μg/m3) - <b>{aqi.o3}</b>
							</p>
							<p>
								NO2 - Nitrogen dioxide (μg/m3) - <b>{aqi.no2}</b>
							</p>
							<p>
								SO2 - Sulphur dioxide (μg/m3) - <b>{aqi.so2}</b>
							</p>
							<p>
								PM2.5 (μg/m3) - <b>{aqi.pm2_5}</b>
							</p>
							<p>
								PM10 (μg/m3) - <b>{aqi.pm10}</b>
							</p>
						</PopoverContent>
					</Popover>
				</div>
				<p className='text-sm'>
					US EPA INDEX - <span className='font-extrabold'>{aqi['gb-defra-index']}</span> <br />
					UK DEFRA INDEX - <span className='font-extrabold'>{aqi['us-epa-index']}</span>
				</p>
				<p className='leading-tight'>{currentRange.text}</p>
			</CardContent>
		</Card>
	)
}

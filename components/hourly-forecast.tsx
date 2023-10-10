import { Separator } from './ui/separator'
import { Card, CardContent, CardTitle } from './ui/card'
import { CloudRain, CloudSun, Cloudy, Divide, Sun } from 'lucide-react'

type HourlyForecast = {
	time: string // Time in HH:mm format
	temp: number // Temperature in Celsius
	icon_id: keyof typeof icons // Weather condition icon ID (e.g., sunny, partly_cloudy, rainy, etc.)
	precip: number // Precipitation in percentage
}

const hourlyForecast: HourlyForecast[] = [
	{
		time: '00:00',
		temp: 18,
		icon_id: 'sunny',
		precip: 0
	},
	{
		time: '02:00',
		temp: 17,
		icon_id: 'partly_cloudy',
		precip: 0
	},
	{
		time: '04:00',
		temp: 16,
		icon_id: 'cloudy',
		precip: 0
	},
	{
		time: '06:00',
		temp: 15,
		icon_id: 'rainy',
		precip: 0
	},
	{
		time: '08:00',
		temp: 16,
		icon_id: 'rainy',
		precip: 30
	},
	{
		time: '10:00',
		temp: 18,
		icon_id: 'partly_cloudy',
		precip: 15
	},
	{
		time: '12:00',
		temp: 20,
		icon_id: 'sunny',
		precip: 5
	},
	{
		time: '14:00',
		temp: 22,
		icon_id: 'sunny',
		precip: 0
	},
	{
		time: '16:00',
		temp: 23,
		icon_id: 'partly_cloudy',
		precip: 5
	},
	{
		time: '18:00',
		temp: 21,
		icon_id: 'partly_cloudy',
		precip: 10
	},
	{
		time: '20:00',
		temp: 20,
		icon_id: 'cloudy',
		precip: 20
	},
	{
		time: '22:00',
		temp: 19,
		icon_id: 'rainy',
		precip: 40
	}
]

const icons = {
	cloudy: <Cloudy size={32}></Cloudy>,
	partly_cloudy: <CloudSun size={32}></CloudSun>,
	rainy: <CloudRain size={32}></CloudRain>,
	sunny: <Sun size={32}></Sun>
}

export default function HourlyForecast() {
	return (
		<Card className='col-span-full relative'>
			<CardTitle className='font-title absolute text-xl pt-2 pl-3 pb-2 z-10 rounded-xl bg-white tracking-wide'>
				HOURLY FORECAST
			</CardTitle>
			<CardContent className='flex items-center h-full p-0'>
				{hourlyForecast.map((item, i) => (
					<>
						<div className='flex flex-col gap-6 justify-center items-center w-full h-full '>
							<p className='font-medium'>{item.time}</p>
							{icons[item.icon_id]}
							<p className='text-lg font-semibold'>{item.temp} °C</p>
							{item.precip !== 0 && (
								<div className='flex gap-2 items-center h-8 absolute bottom-6'>
									<CloudRain size={20}></CloudRain> <p className='font-light  text-sm'>{item.precip} %</p>
								</div>
							)}
						</div>
						<Separator orientation='vertical' className='last-of-type:hidden'></Separator>
					</>
				))}
			</CardContent>
		</Card>
	)
}

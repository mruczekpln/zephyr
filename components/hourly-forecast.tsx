import { Separator } from './ui/separator'
import { Card, CardContent, CardTitle } from './ui/card'
import { CloudRain, CloudSun, Cloudy, Divide, icons, Sun } from 'lucide-react'
import Conditions, { getConditionByID, getBiggerIcon } from '@/lib/conditions'
import { HourlyWeather } from '@/lib/types'
import { roundToNearest5 } from '@/lib/utils/weather-data'

type Props = { hourlyData: HourlyWeather[] }
export default function HourlyForecast({ hourlyData }: Props) {
	return (
		<Card className='col-span-full relative'>
			<CardTitle className='font-title absolute text-xl pt-2 pl-3 pb-2 z-10 rounded-xl bg-background tracking-wide'>
				HOURLY FORECAST
			</CardTitle>
			<CardContent className='flex items-center h-full p-0'>
				{hourlyData.map((item, i) => (
					<>
						<div className='flex flex-col gap-4 justify-center items-center w-full h-full '>
							<p className='font-medium text-lg leading-none'>{item.datetime.slice(0, 5)}</p>
							<p className='text-center h-[2rem] text-xs leading-tight align-middle'>
								{getConditionByID(item.conditions)?.desc}
							</p>
							{getBiggerIcon(getConditionByID(item.conditions)?.icon || <CloudRain></CloudRain>)}
							<p className='text-lg font-bold'>{Math.round(item.temp)} °C</p>
							{item.precipprob !== 0 && (
								<div className='flex gap-2 items-center h-8 absolute bottom-4'>
									<CloudRain size={20}></CloudRain>{' '}
									<p className='font-light  text-sm'>{roundToNearest5(item.precipprob)}%</p>
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

import { Separator } from '@/components/ui/separator'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { CloudRain, CloudSun, Cloudy, Divide, icons, Sun } from 'lucide-react'
import Conditions, { getConditionByID, getBiggerIcon } from '@/lib/conditions'
import { roundToNearest5 } from '@/lib/utils/weather-data'
import { HourlyData, UserSettings } from '@/types/index'
import HourlyItem from './hourly-item'

type Props = { unit: UserSettings['unit']; hourlyData: HourlyData[] }
export default function HourlyForecast({ unit, hourlyData }: Props) {
	return (
		<Card className='col-span-full relative min-h-[200px]'>
			<CardTitle className='font-title absolute text-xl pt-2 pl-3 pb-2 z-10 rounded-xl bg-background tracking-wide'>
				HOURLY FORECAST
			</CardTitle>
			<CardContent className='flex items-center h-full p-0'>
				{hourlyData.map((item, i) => (
					<HourlyItem unit={unit} data={item} key={i}></HourlyItem>
				))}
			</CardContent>
		</Card>
	)
}

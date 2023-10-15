import { Table, TableBody, TableRow, TableCell, TableHeader, TableHead } from './ui/table'
import { Card, CardContent, CardTitle } from './ui/card'
import { ArrowDownFromLine, ArrowUpFromLine, CloudRain, CloudSun, Cloudy, Sun, Wind } from 'lucide-react'
import { DailyWeather } from '@/lib/types'
import { getConditionByID } from '@/lib/conditions'
import { roundToNearest5 } from '@/lib/utils/weather-data'

type Props = { dailyForecast: DailyWeather[] }
export default function SevenDayForecast({ dailyForecast }: Props) {
	function getDayName(dateStr: string) {
		const date = new Date(dateStr)
		return date.toLocaleDateString('en-US', { weekday: 'long' })
	}
	return (
		<Card className='row-span-2 col-span-3 font-medium h-full flex flex-col relative'>
			<CardTitle className='font-title pl-3 text-xl pt-2'>7-DAY FORECAST</CardTitle>
			<CardContent className='p-0 h-full'>
				<Table className='h-full'>
					<TableHeader className=''>
						<TableRow>
							<TableHead>Day</TableHead>
							<TableHead>Condition</TableHead>
							<TableHead>Temperature</TableHead>
							<TableHead>Rain prob.</TableHead>
							<TableHead>Wind Speed</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{dailyForecast.map((item, i) => (
							<TableRow key={i}>
								<TableCell className='font-semibold py-0'>
									{getDayName(item.datetime)} <p className='text-xs font-light'>{item.datetime}</p>
								</TableCell>
								<TableCell className='flex gap-2 items-center h-full'>
									{getConditionByID(item.conditions)?.icon}
									{getConditionByID(item.conditions)?.desc}
								</TableCell>
								<TableCell>
									<ArrowUpFromLine className='inline-block mr-1' size={16} />
									{item.tempmax}
									<ArrowDownFromLine className='inline-block m-1' size={16} />
									{item.tempmin} Celsius
								</TableCell>
								<TableCell>
									<CloudRain className='inline-block mr-2 '></CloudRain>
									<p className='inline underline decoration-blue-400 decoration-double'>
										{roundToNearest5(item.precipprob)}%
									</p>
								</TableCell>
								<TableCell>
									<Wind className='inline-block mr-2 '></Wind>
									<p className='underline decoration-double decoration-gray-500 inline'>{item.windspeed}</p> km/h
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	)
}

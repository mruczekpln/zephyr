import { Table, TableBody, TableRow, TableCell, TableHeader, TableHead } from '../../../../components/ui/table'
import { Card, CardContent, CardTitle } from '../../../../components/ui/card'
import { ArrowDownFromLine, ArrowUpFromLine, CloudRain, CloudSun, Cloudy, Sun, Wind } from 'lucide-react'
import { getConditionByID } from '@/lib/conditions'
import { roundToNearest5 } from '@/lib/utils/weather-data'
import { DailyData, UserSettings } from '@/lib/types'
import DailyItem from './daily-item'

type Props = { dailyForecast: DailyData[]; unit: UserSettings['unit'] }
export default function SevenDayForecast({ unit, dailyForecast }: Props) {
	return (
		<Card className='row-span-2 col-span-3 font-medium h-full flex flex-col relative'>
			<CardTitle className='font-title pl-3 text-xl pt-2'>7-DAY FORECAST</CardTitle>
			<CardContent className='p-0 h-full'>
				<Table className='h-full'>
					<TableHeader className=''>
						<TableRow>
							<TableHead className='leading-none'>
								Day <br /> <span className='text-xs leading-none'>hover for more</span>
							</TableHead>
							<TableHead>Condition</TableHead>
							<TableHead>Temperature</TableHead>
							<TableHead>Rain prob.</TableHead>
							<TableHead>Wind Speed</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{dailyForecast.map((item, i) => (
							<DailyItem unit={unit} data={item} key={i}></DailyItem>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	)
}

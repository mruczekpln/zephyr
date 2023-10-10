import { Table, TableBody, TableRow, TableCell, TableHeader, TableHead } from './ui/table'
import { Card, CardContent, CardTitle } from './ui/card'
import { ArrowDownFromLine, ArrowUpFromLine, CloudRain, CloudSun, Cloudy, Sun, Wind } from 'lucide-react'

type WeatherForecast = {
	day: string
	date: string
	condition: string
	icon_id: keyof typeof icons
	max_temp: number
	min_temp: number
	precip: number
	wind_kph: number
}

const forecast: WeatherForecast[] = [
	{
		day: 'Monday',
		date: '2023-10-09',
		condition: 'Sunny',
		icon_id: 'sunny',
		max_temp: 24,
		min_temp: 12,
		precip: 20,
		wind_kph: 15
	},
	{
		day: 'Tuesday',
		date: '2023-10-10',
		condition: 'Cloudy',
		icon_id: 'cloudy',
		max_temp: 25,
		min_temp: 13,
		precip: 10,
		wind_kph: 10
	},
	{
		day: 'Wednesday',
		date: '2023-10-11',
		condition: 'Rainy',
		icon_id: 'rainy',
		max_temp: 23,
		min_temp: 11,
		precip: 5,
		wind_kph: 12
	},
	{
		day: 'Thursday',
		date: '2023-10-12',
		condition: 'Partly Cloudy',
		icon_id: 'partly_cloudy',
		max_temp: 22,
		min_temp: 10,
		precip: 15,
		wind_kph: 18
	},
	{
		day: 'Friday',
		date: '2023-10-13',
		condition: 'Rainy',
		icon_id: 'rainy',
		max_temp: 21,
		min_temp: 9,
		precip: 30,
		wind_kph: 22
	},
	{
		day: 'Saturday',
		date: '2023-10-14',
		condition: 'Partly Cloudy',
		icon_id: 'partly_cloudy',
		max_temp: 22,
		min_temp: 11,
		precip: 25,
		wind_kph: 14
	},
	{
		day: 'Sunday',
		date: '2023-10-15',
		condition: 'Sunny',
		icon_id: 'sunny',
		max_temp: 23,
		min_temp: 12,
		precip: 10,
		wind_kph: 16
	}
]

const icons = {
	cloudy: <Cloudy className='inline-block mr-2'></Cloudy>,
	partly_cloudy: <CloudSun className='inline-block mr-2'></CloudSun>,
	rainy: <CloudRain className='inline-block mr-2'></CloudRain>,
	sunny: <Sun className='inline-block mr-2'></Sun>
}

export default function SevenDayForecast() {
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
						{forecast.map((item, i) => (
							<TableRow key={i}>
								<TableCell className='font-semibold'>{item.day}</TableCell>
								<TableCell>
									{icons[item.icon_id]}
									{item.condition}
								</TableCell>
								<TableCell>
									<ArrowUpFromLine className='inline-block mr-1' size={16} />
									{item.max_temp}
									<ArrowDownFromLine className='inline-block m-1' size={16} />
									{item.min_temp} Celsius
								</TableCell>
								<TableCell>
									<CloudRain className='inline-block mr-2'></CloudRain>
									<p className='inline'>{item.precip}%</p>
								</TableCell>
								<TableCell>
									<Wind className='inline-block mr-2'></Wind>
									{item.wind_kph} km/h
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	)
}

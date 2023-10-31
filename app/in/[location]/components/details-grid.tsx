import { UserSettings, WeatherData } from '@/lib/types'
import { getHourlyData } from '@/lib/utils/weather-data'
import SevenDayForecast from './7day-forecast'
import Astronomy from './astronomy'
import HourlyForecast from './hourly-forecast'
import AirQuality from './air-quality'
import Minimap from './minimap'

type Props = { location: string; unit: UserSettings['unit']; weatherData: WeatherData }
export default function DetailsGrid({ location, unit, weatherData }: Props) {
	return (
		<div className='min-h-screen overflow-x-hidden flex flex-col items-center w-screen py-10'>
			<div
				className={`h-[800px] grid grid-cols-[repeat(5,_250px)] grid-rows-[repeat(3,_250px)] gap-4 mt-8 leading-none `}
			>
				<HourlyForecast unit={unit} hourlyData={getHourlyData(weatherData.days)}></HourlyForecast>
				<SevenDayForecast unit={unit} dailyForecast={weatherData.days.slice(-7)}></SevenDayForecast>
				<AirQuality lat={weatherData.latitude} lon={weatherData.longitude}></AirQuality>
				<Astronomy location={location}></Astronomy>
				{/* @ts-expect-error Server Component */}
				<Minimap lat={weatherData.latitude} lon={weatherData.longitude}></Minimap>
			</div>
		</div>
	)
}

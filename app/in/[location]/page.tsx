import Details from '@/components/details'
import { Separator } from '@/components/ui/separator'
import {
	ChevronDown,
	Cloud,
	CloudFog,
	CloudHail,
	CloudLightning,
	CloudRain,
	CloudSnow,
	CloudSun,
	Cloudy,
	Sun
} from 'lucide-react'

import SevenDayForecast from '@/components/7day-forecast'
import HourlyForecast from '@/components/hourly-forecast'
import AirQualityIndex from '@/components/aqi'
import MoonPhase from '@/components/moon-phase'
import Minimap from '@/components/minimap'
import TitleInfo from '@/components/title-info'

export type CurrentWeather = {
	last_updated_epoch: number
	last_updated: string
	temp_c: number
	temp_f: number
	is_day: number
	condition: {
		text: string
		icon: string
		code: number
	}
	wind_mph: number
	wind_kph: number
	wind_degree: number
	wind_dir: string
	pressure_mb: number
	pressure_in: number
	precip_mm: number
	precip_in: number
	humidity: number
	cloud: number
	feelslike_c: number
	feelslike_f: number
	vis_km: number
	vis_miles: number
	uv: number
	gust_mph: number
	gust_kph: number
	air_quality: AirQuality
}

export type HourlyForecast = {
	time_epoch: number
	time: string
	temp_c: number
	temp_f: number
	is_day: number
	condition: {
		text: string
		icon: string
		code: number
	}
	wind_mph: number
	wind_kph: number
	wind_degree: number
	wind_dir: string
	pressure_mb: number
	pressure_in: number
	precip_mm: number
	precip_in: number
	humidity: number
	cloud: number
	feelslike_c: number
	feelslike_f: number
	windchill_c: number
	windchill_f: number
	heatindex_c: number
	heatindex_f: number
	dewpoint_c: number
	dewpoint_f: number
	will_it_rain: number
	chance_of_rain: number
	will_it_snow: number
	chance_of_snow: number
	vis_km: number
	vis_miles: number
	gust_mph: number
	gust_kph: number
	uv: number
	air_quality: AirQuality
}

export type AirQuality = {
	'co': number
	'no2': number
	'o3': number
	'so2': number
	'pm2_5': number
	'pm10': number
	'us-epa-index': number
	'gb-defra-index': number
}

export type DailyForecast = {
	date: string
	date_epoch: number
	day: {
		maxtemp_c: number
		maxtemp_f: number
		mintemp_c: number
		mintemp_f: number
		avgtemp_c: number
		avgtemp_f: number
		maxwind_mph: number
		maxwind_kph: number
		totalprecip_mm: number
		totalprecip_in: number
		totalsnow_cm: number
		avgvis_km: number
		avgvis_miles: number
		avghumidity: number
		daily_will_it_rain: number
		daily_chance_of_rain: number
		daily_will_it_snow: number
		daily_chance_of_snow: number
		condition: {
			text: string
			icon: string
			code: number
		}
		uv: number
		air_quality: AirQuality
	}
	astro: {
		sunrise: string
		sunset: string
		moonrise: string
		moonset: string
		moon_phase: string
		moon_illumination: string
		is_moon_up: number
		is_sun_up: number
	}
}

export type Astronomy = {
	sunrise: string
	sunset: string
	moonrise: string
	moonset: string
	moon_phase: string
	moon_illumination: string
	is_moon_up: number
	is_sun_up: number
}

export type DailyForecastWithHour = {
	date: string
	date_epoch: number
	day: {
		maxtemp_c: number
		maxtemp_f: number
		mintemp_c: number
		mintemp_f: number
		avgtemp_c: number
		avgtemp_f: number
		maxwind_mph: number
		maxwind_kph: number
		totalprecip_mm: number
		totalprecip_in: number
		totalsnow_cm: number
		avgvis_km: number
		avgvis_miles: number
		avghumidity: number
		daily_will_it_rain: number
		daily_chance_of_rain: number
		daily_will_it_snow: number
		daily_chance_of_snow: number
		condition: {
			text: string
			icon: string
			code: number
		}
		uv: number
		air_quality: AirQuality
	}
	astro: Astronomy
	hour: HourlyForecast[] // Hourly forecast contained within daily forecast
}

export type LocationInfo = {
	name: string // Name of the location (e.g., "Warsaw")
	region: string // Region or province (if available)
	country: string // Country (e.g., "Poland")
	lat: number // Latitude (e.g., 52.25)
	lon: number // Longitude (e.g., 21.0)
	tz_id: string // Timezone ID (e.g., "Europe/Warsaw")
	localtime_epoch: number // Local time in epoch format (e.g., 1696953714)
	localtime: string // Local time in readable format (e.g., "2023-10-10 18:01")
}

type WeatherCondition = {
	code: number
	icon: JSX.Element
	desc: string
}

export const weatherIcons: WeatherCondition[] = [
	{
		code: 1000,
		icon: <Sun />,
		desc: 'Sunny'
	},
	{
		code: 1003,
		icon: <Cloud />,
		desc: 'Partly cloudy'
	},
	{
		code: 1006,
		icon: <Cloudy />,
		desc: 'Cloudy'
	},
	{
		code: 1009,
		icon: <Cloudy />,
		desc: 'Overcast'
	},
	{
		code: 1030,
		icon: <CloudFog />,
		desc: 'Mist'
	},
	{
		code: 1063,
		icon: <CloudRain />,
		desc: 'Patchy rain possible'
	},
	{
		code: 1066,
		icon: <CloudSnow />,
		desc: 'Patchy snow possible'
	},
	{
		code: 1069,
		icon: <CloudRain />,
		desc: 'Patchy sleet possible'
	},
	{
		code: 1072,
		icon: <CloudRain />,
		desc: 'Patchy freezing drizzle possible'
	},
	{
		code: 1087,
		icon: <CloudLightning />,
		desc: 'Thundery outbreaks possible'
	},
	{
		code: 1114,
		icon: <CloudSnow />,
		desc: 'Blowing snow'
	},
	{
		code: 1117,
		icon: <CloudSnow />,
		desc: 'Blizzard'
	},
	{
		code: 1135,
		icon: <CloudFog />,
		desc: 'Fog'
	},
	{
		code: 1147,
		icon: <CloudFog />,
		desc: 'Freezing fog'
	},
	{
		code: 1150,
		icon: <CloudRain />,
		desc: 'Patchy light drizzle'
	},
	{
		code: 1153,
		icon: <CloudRain />,
		desc: 'Light drizzle'
	},
	{
		code: 1168,
		icon: <CloudRain />,
		desc: 'Freezing drizzle'
	},
	{
		code: 1171,
		icon: <CloudRain />,
		desc: 'Heavy freezing drizzle'
	},
	{
		code: 1180,
		icon: <CloudRain />,
		desc: 'Patchy light rain'
	},
	{
		code: 1183,
		icon: <CloudRain />,
		desc: 'Light rain'
	},
	{
		code: 1186,
		icon: <CloudRain />,
		desc: 'Moderate rain at times'
	},
	{
		code: 1189,
		icon: <CloudRain />,
		desc: 'Moderate rain'
	},
	{
		code: 1192,
		icon: <CloudRain />,
		desc: 'Heavy rain at times'
	},
	{
		code: 1195,
		icon: <CloudRain />,
		desc: 'Heavy rain'
	},
	{
		code: 1198,
		icon: <CloudRain />,
		desc: 'Light freezing rain'
	},
	{
		code: 1201,
		icon: <CloudRain />,
		desc: 'Moderate or heavy freezing rain'
	},
	{
		code: 1204,
		icon: <CloudSun />,
		desc: 'Light sleet'
	},
	{
		code: 1210,
		icon: <CloudSnow />,
		desc: 'Patchy light snow'
	},
	{
		code: 1213,
		icon: <CloudSnow />,
		desc: 'Light snow'
	},
	{
		code: 1216,
		icon: <CloudSnow />,
		desc: 'Patchy moderate snow'
	},
	{
		code: 1219,
		icon: <CloudSnow />,
		desc: 'Moderate snow'
	},
	{
		code: 1222,
		icon: <CloudSnow />,
		desc: 'Patchy heavy snow'
	},
	{
		code: 1225,
		icon: <CloudSnow />,
		desc: 'Heavy snow'
	},
	{
		code: 1237,
		icon: <CloudHail />,
		desc: 'Ice pellets'
	},
	{
		code: 1240,
		icon: <CloudRain />,
		desc: 'Light rain shower'
	},
	{
		code: 1243,
		icon: <CloudRain />,
		desc: 'Moderate or heavy rain shower'
	},
	{
		code: 1246,
		icon: <CloudRain />,
		desc: 'Torrential rain shower'
	},
	{
		code: 1249,
		icon: <CloudRain />,
		desc: 'Light sleet showers'
	},
	{
		code: 1252,
		icon: <CloudSnow />,
		desc: 'Moderate or heavy sleet showers'
	},
	{
		code: 1255,
		icon: <CloudSnow />,
		desc: 'Light snow showers'
	},
	{
		code: 1258,
		icon: <CloudSnow />,
		desc: 'Moderate or heavy snow showers'
	},
	{
		code: 1261,
		icon: <CloudLightning />,
		desc: 'Light showers of ice pellets'
	},
	{
		code: 1264,
		icon: <CloudLightning />,
		desc: 'Moderate or heavy showers of ice pellets'
	},
	{
		code: 1273,
		icon: <CloudRain />,
		desc: 'Patchy light rain with thunder'
	},
	{
		code: 1276,
		icon: <CloudRain />,
		desc: 'Moderate or heavy rain with thunder'
	},
	{
		code: 1279,
		icon: <CloudLightning />,
		desc: 'Patchy light snow with thunder'
	},
	{
		code: 1282,
		icon: <CloudLightning />,
		desc: 'Moderate or heavy snow with thunder'
	}
]

type WeatherData = {
	location: LocationInfo
	current: CurrentWeather
	forecast: {
		forecastday: DailyForecastWithHour[]
	}
}

async function getWeatherData(location: string) {
	const response = await fetch(
		`http://api.weatherapi.com/v1/forecast.json?key=c7991964f25c43439a5151515232809&q=${location}&days=8&aqi=yes&alerts=no`,
		{ cache: 'no-store' }
	)

	const data = await response.json()

	return data
}

function getHourlyData(localTime: string, data: DailyForecastWithHour[]) {
	const allHourForecasts: HourlyForecast[] = []
	data.forEach(day => day.hour.forEach(hour => allHourForecasts.push(hour)))

	const localDate = new Date(localTime)

	const closest24Hours: HourlyForecast[] = []
	for (let i = 0, j = 0; i < allHourForecasts.length; i++) {
		if (j === 24) break

		const hour = allHourForecasts[i]
		const hourDate = new Date(hour.time)

		if (localDate < hourDate) {
			closest24Hours.push(hour)
			j++
		}
	}
	const closest24Hours2HourInterval = closest24Hours.filter((hour, index) => !(Number(hour.time.charAt(12)) % 2))

	return closest24Hours2HourInterval
}

function getDailyForecastWithoutHour(forecastDay: DailyForecastWithHour[]) {
	return forecastDay.map(({ hour, ...rest }) => rest)
}

type Params = { params: { location: string } }
export default async function InLocation({ params }: Params) {
	const data: WeatherData = await getWeatherData(params.location)

	const current = data.current
	const today = data.forecast.forecastday[0]

	return (
		<div className='min-h-screen'>
			<TitleInfo
				location={params.location}
				data={{
					temp: current.temp_c,
					chance_of_rain: today.day.daily_chance_of_rain,
					chance_of_snow: today.day.daily_chance_of_snow,
					maxtemp: today.day.maxtemp_c,
					mintemp: today.day.mintemp_c,
					wind: { kph: current.wind_kph, direction: current.wind_dir }
				}}
			></TitleInfo>
			<div className='min-h-screen overflow-x-hidden flex flex-col items-center w-screen py-10'>
				<div
					className={`h-[800px] grid grid-cols-[repeat(5,_250px)] grid-rows-[repeat(3,_250px)] gap-4 mt-8 leading-none `}
				>
					<HourlyForecast
						hourlyData={getHourlyData(data.location.localtime, data.forecast.forecastday)}
					></HourlyForecast>
					<SevenDayForecast
						dailyForecast={getDailyForecastWithoutHour(data.forecast.forecastday).slice(-7)}
					></SevenDayForecast>
					<AirQualityIndex aqi={data.current.air_quality}></AirQualityIndex>
					<MoonPhase astro={data.forecast.forecastday[0].astro}></MoonPhase>
					{/* @ts-expect-error Server Component */}
					<Minimap lat={data.location.lat} lon={data.location.lon}></Minimap>
				</div>
			</div>
		</div>
	)
}

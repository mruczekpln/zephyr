import SevenDayForecast from '@/components/7day-forecast'
import HourlyForecast from '@/components/hourly-forecast'
import Minimap from '@/components/minimap'
import TitleInfo from '@/components/title-info'
import Astronomy from '@/components/astronomy'
import { env } from 'process'

import { WeatherData } from '@/lib/types'
import { getHourlyData, getDailyForecastWithoutHour } from '@/lib/utils/weather-data'
import AirQualityIndex from '@/components/air-quality'
import { useState } from 'react'
import { revalidatePath } from 'next/cache'
import GoBack from '@/components/ui/go-back'

async function getWeatherData(location: string) {
	const response = await fetch(
		`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/next7days?unitGroup=metric&key=${env.WEATHER_API_KEY}&include=current,hours&lang=id&contentType=json`,
		{ next: { revalidate: 60 } }
	)

	if (response.status === 400)
		return {
			ok: 'false'
		}

	const data = await response.json()

	return data
}

type Params = { params: { location: string } }
export default async function InLocation({ params }: Params) {
	const data = await getWeatherData(params.location)

	if (data['ok'] && !!data['ok'])
		return (
			<div className='h-screen flex items-center flex-col justify-center gap-16'>
				<h1 className='text-6xl text-center font-title'>Bad location</h1>
				<GoBack></GoBack>
			</div>
		)

	const weatherData: WeatherData = data

	const current = weatherData.currentConditions
	const today = weatherData.days[0]

	const maxTemps = weatherData.days.map(day => Math.round(day.tempmax)).join(',')
	const minTemps = weatherData.days.map(day => Math.round(day.tempmin)).join(',')

	return (
		<div
			className='min-h-screen bg-opacity-30 bg-no-repeat'
			style={{
				backgroundImage: `url(https://quickchart.io/chart/render/zm-08a22020-3937-410b-a00b-ca8ba00a20a4?${maxTemps}&data2=${minTemps})`,
				backgroundPosition: 'right 0px top -80px'
			}}
		>
			<TitleInfo
				location={params.location}
				data={{
					temp: current.temp,
					chance_of_rain: today.preciptype !== null && today.preciptype.includes('rain') ? today.precipprob : 0,
					chance_of_snow: today.snow ? today.precipprob : 0,
					maxtemp: today.tempmax,
					mintemp: today.tempmin,
					wind: { kph: current.windspeed, direction: current.winddir }
				}}
			></TitleInfo>
			<div className='min-h-screen overflow-x-hidden flex flex-col items-center w-screen py-10'>
				<div
					className={`h-[800px] grid grid-cols-[repeat(5,_250px)] grid-rows-[repeat(3,_250px)] gap-4 mt-8 leading-none `}
				>
					<HourlyForecast hourlyData={getHourlyData(weatherData.days)}></HourlyForecast>
					<SevenDayForecast dailyForecast={getDailyForecastWithoutHour(weatherData.days)}></SevenDayForecast>
					{/* @ts-expect-error Server Component */}
					<AirQualityIndex lat={weatherData.latitude} lon={weatherData.longitude}></AirQualityIndex>
					<Astronomy location={params.location}></Astronomy>
					{/* @ts-expect-error Server Component */}
					<Minimap lat={weatherData.latitude} lon={weatherData.longitude}></Minimap>
				</div>
			</div>
		</div>
	)
}

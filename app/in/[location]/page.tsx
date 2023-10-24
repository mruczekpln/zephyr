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

async function getWeatherData(location: string) {
	const response = await fetch(
		`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/next7days?unitGroup=metric&key=${env.WEATHER_API_KEY}&include=current,hours&lang=id&contentType=json`,
		{ next: { revalidate: 60 } }
	)

	const data = await response.json()

	return data
}

type Params = { params: { location: string } }
export default async function InLocation({ params }: Params) {
	const data: WeatherData = await getWeatherData(params.location)

	const current = data.currentConditions
	const today = data.days[0]

	const maxTemps = data.days.map(day => Math.round(day.tempmax)).join(',')
	const minTemps = data.days.map(day => Math.round(day.tempmin)).join(',')

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
					<HourlyForecast hourlyData={getHourlyData(data.days)}></HourlyForecast>
					<SevenDayForecast dailyForecast={getDailyForecastWithoutHour(data.days)}></SevenDayForecast>
					{/* @ts-expect-error Server Component */}
					<AirQualityIndex lat={data.latitude} lon={data.longitude}></AirQualityIndex>
					<Astronomy location={params.location}></Astronomy>
					{/* @ts-expect-error Server Component */}
					<Minimap lat={data.latitude} lon={data.longitude}></Minimap>
				</div>
			</div>
		</div>
	)
}

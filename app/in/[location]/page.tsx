import { env } from 'process'

import { User, WeatherData } from '@/types/index'
import { redirect } from 'next/navigation'
import Title from './components/title'
import DetailsGrid from './components/details-grid'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import addSearch from '@/app/api/users/add-search'

async function getWeatherData(location: string, unitGroup: 'metric' | 'us') {
	const response = await fetch(
		`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/next7days?unitGroup=${unitGroup}&key=${env.WEATHER_API_KEY}&include=current,hours&lang=id&contentType=json`,
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
	const session = (await getServerSession(authOptions)) as { user: User }
	const unit = session ? (session.user.settings.unit === 'imperial' ? 'us' : 'metric') : 'metric'
	const data = await getWeatherData(params.location, unit)
	if (data['ok'] && !!data['ok']) redirect('/?invalid-location=true')

	const weatherData: WeatherData = data

	const current = weatherData.currentConditions
	const today = weatherData.days[0]

	if (session)
		addSearch(session.user._id as string, {
			name: weatherData.resolvedAddress,
			query: decodeURI(params.location),
			lat: weatherData.latitude,
			lon: weatherData.longitude
		})

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
			<Title
				location={params.location}
				unit={session && session.user.settings.unit}
				resolvedAdress={weatherData.resolvedAddress}
				data={{
					temp: current.temp,
					chance_of_rain: today.preciptype !== null && today.preciptype.includes('rain') ? today.precipprob : 0,
					chance_of_snow: today.snow ? today.precipprob : 0,
					maxtemp: today.tempmax,
					mintemp: today.tempmin,
					wind: { kph: current.windspeed, direction: current.winddir }
				}}
			></Title>
			<DetailsGrid
				weatherData={weatherData}
				unit={session && session.user.settings.unit}
				location={params.location}
			></DetailsGrid>
		</div>
	)
}

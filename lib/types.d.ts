import { Search } from 'lucide-react'
import { HourlyWeather as HourData } from '@/lib/types'

type HourlyData = {
	datetime: string
	datetimeEpoch: number
	temp: number
	feelslike: number
	humidity: number
	dew: number
	precip: number
	precipprob: number
	snow: number
	snowdepth: number
	preciptype: string[] | null
	windgust: number
	windspeed: number
	winddir: number
	pressure: number
	visibility: number
	cloudcover: number
	solarradiation: number
	solarenergy: number
	uvindex: number
	severerisk: number
	conditions: string
	icon: string
	stations: string[]
	source: string
}

type DailyData = {
	datetime: string
	datetimeEpoch: number
	tempmax: number
	tempmin: number
	temp: number
	feelslikemax: number
	feelslikemin: number
	feelslike: number
	dew: number
	humidity: number
	precip: number
	precipprob: number
	precipcover: number
	preciptype: string[]
	snow: number
	snowdepth: number
	windgust: number
	windspeed: number
	winddir: number
	pressure: number
	cloudcover: number
	visibility: number
	solarradiation: number
	solarenergy: number
	uvindex: number
	severerisk: number
	sunrise: string
	sunriseEpoch: number
	sunset: string
	sunsetEpoch: number
	moonphase: number
	conditions: string
	description: string
	icon: string
	stations: string[]
	source: string
	hours: HourData[]
}

type CurrentConditions = {
	datetime: string
	datetimeEpoch: number
	temp: number
	feelslike: number
	humidity: number
	dew: number
	precip: number
	precipprob: number
	snow: number
	snowdepth: number
	preciptype: string[] | null
	windgust: number
	windspeed: number
	winddir: number
	pressure: number
	visibility: number
	cloudcover: number
	solarradiation: number
	solarenergy: number
	uvindex: number
	conditions: string
	icon: string
	stations: string[]
	source: string
	sunrise: string
	sunriseEpoch: number
	sunset: string
	sunsetEpoch: number
	moonphase: number
}

type WeatherData = {
	queryCost: number
	latitude: number
	longitude: number
	resolvedAddress: string
	address: string
	timezone: string
	tzoffset: number
	description: string
	days: HourlyDailyWeather[]
	currentConditions: CurrentConditions
}

type Condition = {
	id: string
	desc: string
	icon: JSX.Element | null
}

type AqiData = {
	status: string
	data: {
		aqi: number
		idx: number
		attributions: {
			url: string
			name: string
			logo?: string
		}[]
		city: {
			geo: [number, number]
			name: string
			url: string
			location: string
		}
		dominentpol: string
		iaqi: {
			[key: string]: {
				v: number
			}
		}
		time: {
			s: string
			tz: string
			v: number
			iso: string
		}
		forecast: {
			daily: {
				o3: {
					avg: number
					day: string
					max: number
					min: number
				}[]
				pm10: {
					avg: number
					day: string
					max: number
					min: number
				}[]
				pm25: {
					avg: number
					day: string
					max: number
					min: number
				}[]
			}
		}
		debug?: {
			sync: string
		}
	}
}

type AQIMessage = {
	from: number
	to: number
	grade: string
	text: string
}

type MoonPhaseMessage = {
	from: number
	to: number
	text: string
}

type AstronomyData = {
	queryCost: number
	latitude: number
	longitude: number
	resolvedAddress: string
	address: string
	timezone: string
	tzoffset: number
	days: AstronomyDay[]
}

type AstronomyDay = {
	sunrise: string
	sunset: string
	moonphase: number
	moonrise: string
	moonset: string
}

type UserSearches = {
	name: string
	query: string
	date: string
}[]

type UserFavLocation = {
	name: string
	count: number
}

type UserSettings = {
	unit: 'metric' | 'imperial'
}

type User = {
	id?: string
	githubProfileId?: number
	email: string
	password: string | null
	emailVerified: boolean
} & SessionData

type SessionData = {
	_id: string
	name: string
	image: string
	searches: UserSearches
	favLocation: UserFavLocation
	settings: UserSettings
	createdAt: string
}

type Credentials = {
	name: string
	email: string
	password: string
}

export {
	WeatherData,
	CurrentConditions,
	DailyData,
	HourlyData,
	Condition,
	AqiData,
	AQIMessage,
	MoonPhaseMessage,
	AstronomyData,
	User,
	UserFavLocation,
	UserSearches,
	UserSettings,
	SessionData,
	Credentials
}

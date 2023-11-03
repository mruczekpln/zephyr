import { NextResponse } from 'next/server'
import { env } from 'process'

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url)
	const location = searchParams.get('location')

	const response = await fetch(
		`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/today?key=${env.WEATHER_API_KEY}&include=days&elements=moonphase,sunrise,sunset,moonrise,moonset`
	)

	const data = await response.json()

	return NextResponse.json(data)
}

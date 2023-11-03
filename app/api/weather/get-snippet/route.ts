import { NextResponse } from 'next/server'

export async function GET() {
	const response = await fetch(
		`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/warsaw/today?unitGroup=metric&key=${process.env.WEATHER_API_KEY}&include=current&lang=id&contentType=json`
	)

	const data = await response.json()

	return NextResponse.json(data)
}

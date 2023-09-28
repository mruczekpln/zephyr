import { NextResponse } from 'next/server'
import { env } from 'process'

export async function GET(request: Request, { params }: { params: { slug: string } }) {
	const res = await fetch(
		`https://api.weatherapi.com/v1/forecast.json?key=${env['WEATHERAPI_API_KEY']}=${params.slug}&days=7&aqi=no&alerts=no`
	)
	const data = await res.json()

	return NextResponse.json(data)
}

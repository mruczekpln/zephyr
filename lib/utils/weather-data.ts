import { HourlyDailyWeather, HourlyWeather, DailyWeather } from '../types'

function getHourlyData(data: HourlyDailyWeather[]) {
	const allHourForecasts: HourlyWeather[] = []
	data.forEach(day => day.hours.forEach(hour => allHourForecasts.push(hour)))

	const localDate = new Date()

	const closest24Hours: HourlyWeather[] = []
	for (let i = 0, j = 0; i < allHourForecasts.length; i++) {
		if (j === 24) break

		const hour = allHourForecasts[i]
		const hourDate = new Date(0)
		hourDate.setMilliseconds(hour.datetimeEpoch * 1000)

		if (localDate < hourDate) {
			closest24Hours.push(hour)
			j++
		}
	}

	const closest24Hours2HourInterval = closest24Hours.filter(hour => !(Number(hour.datetime.slice(1, 2)) % 2))

	return closest24Hours2HourInterval
}

function getDailyForecastWithoutHour(days: HourlyDailyWeather[]): DailyWeather[] {
	return days.map(({ hours, ...rest }) => rest).slice(-7)
}

function roundToNearest5(number: number) {
	return Math.round(number / 5) * 5
}

function getWindDirection(degrees: number) {
	const directions = ['North', 'Northeast', 'East', 'Southeast', 'South', 'Southwest', 'West', 'Northwest']

	const index = Math.min(Math.round((degrees % 360) / 45), 7)
	const direction = directions[index]

	return direction
}

export { getHourlyData, getDailyForecastWithoutHour, roundToNearest5, getWindDirection }

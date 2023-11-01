import { getWindDirection } from '@/lib/utils/weather-data'
import { ChevronDown } from 'lucide-react'
import TitleDetails from './title-details'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { UserSettings } from '@/types/index'

type PercentageCategory = {
	precip: {
		[key: string]: {
			from: number
			to: number
		}
	}
	wind: {
		[key: string]: {
			from: number
			to: number
		}
	}
}

const percentageCategories: PercentageCategory = {
	precip: {
		'NO RAIN RISK': { from: 0, to: 4 },
		'MINIMAl RAIN RISK': { from: 5, to: 20 },
		'LOW CHANCE OF SHOWERS': { from: 21, to: 40 },
		'HIGH LIKELIHOOD OF RAINFALL': { from: 41, to: 60 },
		'RAIN EXPECTED': { from: 61, to: Infinity }
	},
	wind: {
		'CALM WINDS': { from: 0, to: 5 },
		'GENTLE BREEZE': { from: 6, to: 15 },
		'MODERATE WIND': { from: 16, to: 30 },
		'STRONG GUSTS': { from: 31, to: 50 },
		'HIGH WINDS EXPECTED': { from: 51, to: Infinity }
	}
}

function getCategory(percentage: number, type: 'precip' | 'wind') {
	let categoryString
	if (type === 'precip') {
		for (const category in percentageCategories.precip) {
			const { from, to } = percentageCategories.precip[category]

			if (percentage >= from && percentage <= to) {
				categoryString = category
			}
		}
	} else if (type === 'wind') {
		for (const category in percentageCategories.wind) {
			const { from, to } = percentageCategories.wind[category]
			if (percentage >= from && percentage <= to) {
				categoryString = category
			}
		}
	}

	return categoryString || null // Invalid percentage
}

type Props = {
	resolvedAdress: string
	location: string
	unit: UserSettings['unit']
	data: {
		temp: number
		maxtemp: number
		mintemp: number
		chance_of_rain: number
		chance_of_snow: number
		wind: {
			kph: number
			direction: number
		}
	}
}

export default function Title({ resolvedAdress, location, unit, data }: Props) {
	return (
		<div className='flex flex-col gap-12 justify-center items-center h-screen'>
			<h1 className={`font-title text-7xl text-center leading-none`}>
				<span className='flex gap-8 justify-center'>
					<span className='text-8xl'>TODAY IN:</span>
					<Card className=''>
						<CardContent className='flex items-center h-full py-0'>
							<p className='text-3xl'>{resolvedAdress}</p>
						</CardContent>
					</Card>
				</span>
				<span className='text-9xl'>{data.temp} </span>
				{unit === 'imperial' ? 'Farenheit' : 'Celsius'}
				{/* Celsius */}
				<br />
				<u className='decoration-dotted decoration-blue-400'>
					{getCategory((data.chance_of_snow > 0 && data.chance_of_snow) || data.chance_of_rain, 'precip')}
				</u>{' '}
				AND a
				<br />
				<u className='decoration-dashed decoration-gray-500'>{getCategory(data.wind.kph, 'wind')}</u> FROM THE{' '}
				{getWindDirection(data.wind.direction).toUpperCase()}.
			</h1>
			<TitleDetails
				maxtemp={data.maxtemp}
				mintemp={data.mintemp}
				unit={unit}
				wind_kph={data.wind.kph}
				chance_of_rain={data.chance_of_rain}
				chace_of_snow={data.chance_of_snow}
			></TitleDetails>
			<ChevronDown size={48} className='absolute bottom-10'></ChevronDown>
		</div>
	)
}

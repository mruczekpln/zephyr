import { ChevronDown } from 'lucide-react'
import Details from './details'

type CompassDirections = {
	[key: string]: string
}

const compassDirections: CompassDirections = {
	N: 'NORTH',
	NNE: 'NORTH-NORTHEAST',
	NE: 'NORTHEAST',
	ENE: 'EAST-NORTHEAST',
	E: 'EAST',
	ESE: 'EAST-SOUTHEAST',
	SE: 'SOUTHEAST',
	SSE: 'SOUTH-SOUTHEAST',
	S: 'SOUTH',
	SSW: 'SOUTH-SOUTHWEST',
	SW: 'SOUTHWEST',
	WSW: 'WEST-SOUTHWEST',
	W: 'WEST',
	WNW: 'WEST-NORTHWEST',
	NW: 'NORTHWEST',
	NNW: 'NORTH-NORTHWEST'
}

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
		'MINIMAl RAIN RISK': { from: 10, to: 20 },
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
	if (type === 'precip') {
		for (const category in percentageCategories.precip) {
			const { from, to } = percentageCategories.precip[category]

			if (percentage >= from && percentage <= to) {
				return category
			}
		}
		return null // Invalid percentage
	} else if (type === 'wind') {
		for (const category in percentageCategories.wind) {
			const { from, to } = percentageCategories.wind[category]
			if (percentage >= from && percentage <= to) {
				return category
			}
		}
		return null // Invalid percentage
	}
}

type Props = {
	location: string
	data: {
		temp: number
		maxtemp: number
		mintemp: number
		chance_of_rain: number
		chance_of_snow: number
		wind: {
			kph: number
			direction: string
		}
	}
}
export default function TitleInfo({ location, data }: Props) {
	return (
		<div className='flex flex-col gap-12 justify-center items-center min-h-screen h-auto'>
			<h1 className={`font-title text-7xl text-center leading-none`}>
				<span className='text-8xl'>
					TODAY IN &quot;<u>{location.replace('%20', ' ').toLocaleUpperCase()}</u>&quot;
				</span>
				:
				<br />
				<span className='text-9xl'>{data.temp} </span>
				Celsius
				<br />
				<u className='decoration-dotted decoration-blue-400'>
					{getCategory((data.chance_of_snow > 0 && data.chance_of_snow) || data.chance_of_rain, 'precip')}
				</u>{' '}
				AND a
				<br />
				<u className='decoration-dashed decoration-gray-500'>{getCategory(data.wind.kph, 'wind')}</u> FROM THE{' '}
				{compassDirections[data.wind.direction]}.
			</h1>
			<Details
				maxtemp={data.maxtemp}
				mintemp={data.mintemp}
				wind_kph={data.wind.kph}
				chance_of_rain={data.chance_of_rain}
				chace_of_snow={data.chance_of_snow}
			></Details>
			<ChevronDown size={48} className='absolute bottom-10'></ChevronDown>
		</div>
	)
}

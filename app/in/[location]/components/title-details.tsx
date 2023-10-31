import { UserSettings } from '@/lib/types'
import { ArrowDownFromLine, ArrowUpFromLine, CloudHail, CloudRain, CloudSnow, Wind } from 'lucide-react'

type Props = {
	maxtemp: number
	mintemp: number
	wind_kph: number
	unit: UserSettings['unit']
	chance_of_rain: number
	chace_of_snow: number
}

export default function TitleDetails({ maxtemp, mintemp, wind_kph, unit, chance_of_rain, chace_of_snow }: Props) {
	return (
		<div className='flex w-[1200px] items-center'>
			<div className='flex items-center gap-2 w-1/3'>
				<ArrowDownFromLine />
				<p className='text-4xl font-semibold'>{Math.round(mintemp)}</p>
				<ArrowUpFromLine />
				<p className='text-4xl font-semibold'>{Math.round(maxtemp)}</p>
				<p className='text-xl'>{unit === 'imperial' ? 'Farenheit' : 'Celsius'}</p>
			</div>
			<div className='flex justify-center gap-2 items-center w-1/3'>
				<Wind size={48}></Wind>
				<span className='font-semibold text-3xl'>{Math.round(wind_kph)}</span>
				<p className='text-xl'>{unit === 'imperial' ? 'mph' : 'km/s'}</p>
			</div>
			<div className='w-1/3 flex justify-end items-center text-3xl'>
				<CloudRain size={32} className='mr-4'></CloudRain>
				<p className='font-semibold'>{chance_of_rain}</p>
				<span className='text-base align-middle ml-1 mr-6'>%</span>
				<CloudSnow size={32} className='mr-4'></CloudSnow>
				<p className='font-semibold'>{chace_of_snow}</p>
				<span className='text-base align-middle ml-1 mr-6'>%</span>
			</div>
		</div>
	)
}

import DayForecastCard from '@/components/day-forecast-card'
import { Separator } from '@/components/ui/separator'

import { BiWind } from 'react-icons/bi'
import { BiCloudRain } from 'react-icons/bi'

type Params = { params: { location: string } }

export default async function Page({ params }: Params) {
	return (
		<div className='min-w-screen h-full p-16 flex items-center flex-col gap-16'>
			<div className='w-full flex justify-center gap-16 items-center font-bold'>
				<p className='text-5xl'>
					21<span className='text-3xl align-top'>°C</span>
				</p>
				<p className='text-8xl leading-none'>
					26<span className='text-5xl align-top'>°C</span>
				</p>
				<p className='text-5xl'>
					27<span className='text-3xl align-top'>°C</span>
				</p>
			</div>
			<div className='w-max h-max'></div>

			<div className='flex justify-between items-center w-1/3 text-xl'>
				<div className='flex gap-4 items-center'>
					<BiCloudRain size={'2rem'}></BiCloudRain>
					<p>60%</p>
				</div>
				<div className='flex gap-4 items-center'>
					<BiWind size={'2rem'}></BiWind>
					<p>12 m/s</p>
				</div>
			</div>

			<div className=''>
				<p className='pb-2 pl-2 text-xl'>Next 7 days</p>
				<Separator></Separator>
				<div className='flex gap-4 pt-4'>
					{[...new Array(7)].map((_, i) => (
						<DayForecastCard key={i}></DayForecastCard>
					))}
				</div>
			</div>
		</div>
	)
}

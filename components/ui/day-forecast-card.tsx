import { FiSun } from 'react-icons/fi'
import { Card } from './card'
import { Separator } from './separator'

export default function DayForecastCard() {
	return (
		<Card className='w-[150px] h-[200px] flex flex-col justify-between items-center p-4'>
			<p className='text-xl font-medium'>Monday</p>
			<FiSun size={'2rem'}></FiSun>
			<p>Sunny</p>

			<div className='flex w-full justify-between items-center'>
				<p className='text-xl'>
					25<span className='text-base align-top'>°C</span>
				</p>
				<Separator orientation='vertical'></Separator>
				<p>70%</p>
			</div>
			{/* <Separator></Separator> */}
		</Card>
	)
}

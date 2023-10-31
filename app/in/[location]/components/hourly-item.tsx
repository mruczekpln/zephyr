import { getBiggerIcon, getConditionByID } from '@/lib/conditions'
import { HourlyData, User, UserSettings } from '@/lib/types'
import { roundToNearest5 } from '@/lib/utils/weather-data'
import { Separator } from '@/components/ui/separator'
import { CloudRain } from 'lucide-react'

type Props = { unit: UserSettings['unit']; data: HourlyData }
export default function HourlyItem({ unit, data }: Props) {
	const condition = getConditionByID(data.conditions)

	return (
		<>
			<div className='flex flex-col gap-4 justify-center items-center w-full h-full '>
				<p className='font-medium text-lg leading-none'>{data.datetime.slice(0, 5)}</p>
				<p className='text-center h-[2rem] text-xs leading-tight align-middle'>{condition?.desc}</p>
				{getBiggerIcon(condition?.icon || <CloudRain></CloudRain>)}
				<p className='text-lg font-bold'>
					{Math.round(data.temp)} {unit === 'imperial' ? '°F' : '°C'}
				</p>
				{data.precipprob !== 0 && (
					<div className='flex gap-2 items-center h-8 absolute bottom-4'>
						<CloudRain size={20}></CloudRain> <p className='font-light  text-sm'>{roundToNearest5(data.precipprob)}%</p>
					</div>
				)}
			</div>
			<Separator orientation='vertical' className='last-of-type:hidden'></Separator>
		</>
	)
}

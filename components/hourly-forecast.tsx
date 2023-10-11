import { Separator } from './ui/separator'
import { Card, CardContent, CardTitle } from './ui/card'
import { CloudRain, CloudSun, Cloudy, Divide, icons, Sun } from 'lucide-react'
import { HourlyForecast, weatherIcons } from '@/app/in/[location]/page'
import { cloneElement, ReactElement } from 'react'

type Props = { hourlyData: HourlyForecast[] }
export default function HourlyForecast({ hourlyData }: Props) {
	function getBiggerIcon(Element: ReactElement) {
		const biggerElement = <Element.type {...Element.props} size={30} />

		return biggerElement
	}

	return (
		<Card className='col-span-full relative'>
			<CardTitle className='font-title absolute text-xl pt-2 pl-3 pb-2 z-10 rounded-xl bg-background tracking-wide'>
				HOURLY FORECAST
			</CardTitle>
			<CardContent className='flex items-center h-full p-0'>
				{hourlyData.map((item, i) => (
					<>
						<div className='flex flex-col gap-4 justify-center items-center w-full h-full '>
							<p className='font-medium text-lg leading-none'>{item.time.slice(-5)}</p>
							<p className='text-center h-[2rem] text-sm leading-tight'>{item.condition.text}</p>
							{getBiggerIcon(
								weatherIcons.find(({ code }) => code === item.condition.code)?.icon || <CloudRain></CloudRain>
							)}
							<p className='text-lg font-bold'>{Math.round(item.temp_c)} °C</p>
							{item.chance_of_rain !== 0 && (
								<div className='flex gap-2 items-center h-8 absolute bottom-4'>
									<CloudRain size={20}></CloudRain> <p className='font-light  text-sm'>{item.chance_of_rain} %</p>
								</div>
							)}
						</div>
						<Separator orientation='vertical' className='last-of-type:hidden'></Separator>
					</>
				))}
			</CardContent>
		</Card>
	)
}

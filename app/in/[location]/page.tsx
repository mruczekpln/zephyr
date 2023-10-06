import Details from '@/components/details'
import MainInfo, { titleFont } from '@/components/main-info'
import { Separator } from '@/components/ui/separator'
import { ChevronDown } from 'lucide-react'

import SevenDayForecast from '@/components/7day-forecast'
import HourlyForecast from '@/components/hourly-forecast'
import AirQualityIndex from '@/components/aqi'
import MoonPhase from '@/components/moon-phase'
import Minimap from '@/components/minimap'

type Params = { params: { location: string } }
export default function InLocation({ params }: Params) {
	return (
		<div className='min-h-screen'>
			<div className='flex flex-col gap-12 justify-center items-center min-h-screen h-auto'>
				<MainInfo></MainInfo>
				<Details></Details>
				<ChevronDown size={48} className='absolute bottom-10'></ChevronDown>
			</div>
			<div className='min-h-screen overflow-x-hidden flex flex-col items-center w-screen py-10'>
				<div
					className={`h-[800px] grid grid-cols-[repeat(5,_250px)] grid-rows-[repeat(3,_250px)] gap-4 mt-8 [&>*]:p-4 leading-none ${titleFont.className}`}
				>
					<HourlyForecast></HourlyForecast>
					<SevenDayForecast></SevenDayForecast>
					<AirQualityIndex></AirQualityIndex>
					<MoonPhase></MoonPhase>
					<Minimap></Minimap>
				</div>
			</div>
		</div>
	)
}

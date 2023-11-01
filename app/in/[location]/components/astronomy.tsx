'use client'

import { AstronomyData } from '@/types/index'
import { getMoonPhase } from '@/lib/utils/astronomy'
import { CornerDownLeft, CornerRightUp, MoonStar, MoveDownRight, MoveUpRight, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

async function getAstronomyData(location: string) {
	const response = await fetch(`/api/astronomy/${location}`)
	const data = await response.json()

	return data
}

type Mode = 'sun' | 'moon'
type Props = { location: string }
export default function Astronomy({ location }: Props) {
	const [data, setData] = useState<AstronomyData>({} as AstronomyData)
	const [mode, setMode] = useState<Mode>('sun')

	useEffect(() => {
		getAstronomyData(location).then(data => setData(data))
	}, [location])

	const current = data.days && data.days[0]

	return (
		<Card className='col-start-4 relative  bg-transparent'>
			<CardTitle className='absolute text-xl top-3 left-3 leading-none bg-background flex space-x-2 items-center'>
				<span className='font-title tracking-wide'>{mode === 'sun' ? 'sunRISE/SET' : 'MOONPHASE'}</span>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger
							onClick={() => setMode(mode === 'sun' ? 'moon' : 'sun')}
							className='text-sm align-bottom cursor-pointer hover:underline'
						>
							{mode === 'sun' ? <MoonStar className='inline'></MoonStar> : <Sun className='inline'></Sun>}
							<CornerDownLeft className='inline ml-2' size={12}></CornerDownLeft>
						</TooltipTrigger>
						<TooltipContent>Switch to {mode === 'moon' ? 'sunRISE/SET' : 'MOONPHASE'} info.</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</CardTitle>
			<CardContent className='h-full flex flex-col items-start gap-6 justify-center p-3 bg-transparent'>
				{data &&
					current &&
					(mode === 'moon' ? (
						<>
							<div className='w-32 h-32 rounded-full bg-black absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-10'></div>
							<h2 className='font-bold mix-blend-difference text-white text-2xl'>{getMoonPhase(current.moonphase)}</h2>
							<div className='text-lg'>
								<div>
									<p className='inline text-white mix-blend-difference'>Moonrise</p>
									<MoveUpRight className='mr-2 mix-blend-difference inline' color='white'></MoveUpRight>
									<p className='text-white mix-blend-difference inline'>{current.moonrise}</p>
								</div>
								<div>
									<p className='inline text-white mix-blend-difference'>Moonset</p>
									<MoveDownRight className='mr-2 mix-blend-difference inline' color='white'></MoveDownRight>
									<p className='text-white mix-blend-difference inline'>{current.moonset}</p>
								</div>
							</div>
							<Popover>
								<PopoverTrigger>
									<u className='inline text-sm leading-tight underline-offset-2'>more info</u>
									<CornerRightUp className='inline ml-2' size={12}></CornerRightUp>
								</PopoverTrigger>
								<PopoverContent>
									<b>Moonrise</b> and <b>moonset</b> are times when the upper limb of the Moon appears above the horizon
									and disappears below it, respectively. The exact times depend on the lunar phase and declination, as
									well as the observer&apos;s location.
								</PopoverContent>
							</Popover>
						</>
					) : (
						<>
							<div>
								<p className='inline  text-lg font-bold '>Sunrise</p>
								<MoveUpRight className='  inline'></MoveUpRight>
								<p>{current.sunrise}</p>
							</div>
							<Sun size={128} className='self-center absolute opacity-30'></Sun>
							<div className='self-end text-end'>
								<p>{current.sunset}</p>
								<MoveDownRight className='  inline'></MoveDownRight>
								<p className='inline  text-lg font-bold '>Sunset</p>
							</div>
						</>
					))}
			</CardContent>
		</Card>
	)
}

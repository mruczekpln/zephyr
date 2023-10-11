import { Astronomy } from '@/app/in/[location]/page'
import { Moon, MoveDownRight, MoveUpRight } from 'lucide-react'
import { Card, CardContent, CardTitle } from './ui/card'

type Props = { astro: Astronomy }
export default function MoonPhase({ astro }: Props) {
	return (
		<Card className='col-start-4 relative  bg-transparent'>
			<CardTitle className='font-title absolute text-xl top-2 left-3 tracking-wide leading-none'>MOON PHASE</CardTitle>
			<CardContent className='h-full flex flex-col items-start gap-6 justify-center p-3 bg-transparent'>
				<div className='w-32 h-32 rounded-full bg-black absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-10'></div>
				<h2 className='font-bold mix-blend-difference text-white text-2xl'>{astro.moon_phase}</h2>
				<div className='text-lg'>
					<div>
						<p className='inline text-white mix-blend-difference'>Moonrise</p>
						<MoveUpRight className='mr-2 mix-blend-difference inline' color='white'></MoveUpRight>
						<p className='text-white mix-blend-difference inline'>{astro.moonrise}</p>
					</div>
					<div>
						<p className='inline text-white mix-blend-difference'>Moonset</p>
						<MoveDownRight className='mr-2 mix-blend-difference inline' color='white'></MoveDownRight>
						<p className='text-white mix-blend-difference inline'>{astro.moonset}</p>
					</div>
				</div>
				<p>
					<span className='font-semibold underline decoration-orange-300 decoration-double'>Illumination</span>{' '}
					<span className='mix-blend-difference text-white'>{astro.moon_illumination}%</span>
				</p>
			</CardContent>
		</Card>
	)
}

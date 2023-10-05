import { DM_Serif_Display, Tienne } from 'next/font/google'

const titleFont = DM_Serif_Display({ subsets: ['latin'], weight: '400' })

type Params = { params: { location: string } }
export default function InLocation({ params }: Params) {
	return (
		<div className='grid place-items-center max-h-screen h-screen'>
			<h1 className={`${titleFont.className} text-7xl text-center leading-none`}>
				<span className='text-8xl'>TODAY IN &quot;WARSAW&quot;:</span>
				<br />
				<span className='text-9xl'>24 </span>
				Celsius
				<br />
				LOW CHANCE OF SHOWERS AND a
				<br />
				GENTLE BREEZE FROM THE NORTHWEST.
			</h1>
		</div>
	)
}

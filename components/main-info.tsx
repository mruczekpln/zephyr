import { DM_Serif_Display } from 'next/font/google'

export const titleFont = DM_Serif_Display({ subsets: ['latin'], weight: '400' })
export default function MainInfo() {
	return (
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
	)
}

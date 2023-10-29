import { MousePointerClick } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import Aqicn from '@/public/aqicn.png'
import Vclogo from '@/public/vclogo.svg'

export default function ThankTo() {
	return (
		<div className='flex justify-between items-center h-full w-full px-16'>
			<div className='flex h-full items-center gap-16 [&>*]:text-xl'>
				<p>
					Thanks to: <MousePointerClick className='inline'></MousePointerClick>
				</p>
				<Link href='https://aqicn.org/contact/'>
					<Image
						className='grayscale duration-200 hover:grayscale-0'
						src={Aqicn}
						alt='waqipng'
						objectFit='cover'
						width={50}
						height={50}
					></Image>
				</Link>
				<Link href='https://www.visualcrossing.com/'>
					<Image
						className='grayscale duration-200 hover:grayscale-0 object-cover'
						src={Vclogo}
						alt='waqipng'
						width={200}
						height={50}
					></Image>
				</Link>
			</div>
			<div>
				<p className='inline pr-4'>made by:</p>
				<Link href='https://yummycoffee.github.io' target='_blank' className='underline text-xl'>
					yummycoffee
				</Link>
			</div>
		</div>
	)
}
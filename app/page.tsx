import { Button } from '@/components/ui/button'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
	ArrowDownRightSquare,
	Cloud,
	CloudDrizzle,
	CloudFog,
	CloudHail,
	CloudLightning,
	CloudMoon,
	CloudMoonRain,
	CloudOff,
	CloudRain,
	CloudRainWind,
	CloudSnow,
	CloudSun,
	CloudSunRain,
	Cloudy,
	Divide,
	Droplet,
	Droplets,
	Flame,
	Haze,
	MoonStar,
	MousePointerClick,
	Rainbow,
	Share,
	Snowflake,
	Sparkles,
	Star,
	Sun,
	SunDim,
	SunMedium,
	Sunrise,
	Sunset,
	SunSnow,
	Thermometer,
	ThermometerSnowflake,
	Tornado
} from 'lucide-react'

import gradient from '@/public/gradient.jpeg'
import ScrollingText from '@/components/scrolling-text'
import WeatherSnippet from '@/components/weather-snippet'
import LocationForm from '@/components/location-form'
import Link from 'next/link'
import Image from 'next/image'
import Aqicn from '@/public/aqicn.png'
import Vclogo from '@/public/vclogo.svg'

export default function Home() {
	return (
		<>
			<div className=' grid grid-cols-10 grid-rows-[repeat(10,minmax(0px,1fr))] gap-3 bg-gradient-to-t from-background to-foreground  [&>*]:backdrop-blur-md p-3'>
				<Card className='row-span-4 col-span-full flex items-end p-16'>
					<div className='bottom-8 flex gap-8 items-end w-full h-16'>
						<h1 className='text-7xl font-extrabold grow whitespace-nowrap leading-[0.8]'>What's the weather in</h1>
						<LocationForm></LocationForm>
						<h1 className='text-7xl font-extrabold grow whitespace-nowrap leading-[0.8]'>today?</h1>
					</div>
				</Card>
				<Card
					className='row-span-6 col-span-4 flex items-center justify-center'
					style={{ backgroundImage: `url(${gradient.src})` }}
				></Card>
				{/* @ts-expect-error Server Component */}
				<WeatherSnippet></WeatherSnippet>
				<Card className='row-span-6 col-span-3 col-start-8'>
					<CardContent className='flex flex-col justify-center h-full gap-4'>
						<CardTitle className='font-title text-3xl pt-4'>WHAT'S ZEPHYR ACTUALLY?</CardTitle>
						<h2 className='font-extrabold text-5xl'>Your Weather Companion...</h2>
						<h2 className='font-bold text-2xl'>Unlocking the Beauty of Weather.</h2>
						<p className='text-right text-justify'>
							<u>Zephyr</u> is redefining what you can expect from a weather app. It's not just about forecasts; it's
							about storytelling. Zephyr transforms weather data into immersive narratives. Explore the symphony of the
							seasons, follow the drama of weather systems, and dive into the artistry of the atmosphere. Zephyr is your
							window into the ever-changing canvas of the sky. It's where meteorology becomes a captivating tale, and
							every weather event is a chapter waiting to be discovered. Zephyr is more than just a weather app – it's
							your gateway to experiencing the weather in a whole new way. <br /> (ChatGPT cap.)
						</p>
					</CardContent>
				</Card>
				<Card className='row-span-3 col-span-3 overflow-hidden'>
					<ScrollingText></ScrollingText>
				</Card>
				{/* <h1 className='absolute left-24 text-8xl font-extrabold text-black'>What's the weather in... ?</h1> */}
			</div>
			<div className='flex justify-between items-center h-24 w-full px-16'>
				<div className='flex h-24 items-center gap-16 [&>*]:text-xl'>
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
							className='grayscale duration-200 hover:grayscale-0'
							src={Vclogo}
							alt='waqipng'
							objectFit='cover'
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
		</>
	)
}

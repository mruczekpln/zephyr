import { Card, CardContent, CardTitle } from '@/components/ui/card'

import gradient from '@/public/gradient.jpeg'
import ScrollingText from '@/app/(root)/scrolling-text'
import ThanksTo from '@/app/(root)/thanks-to'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import LocationForm from './location-form'
import WeatherSnippet from './weather-snippet'

export default function Home({
	searchParams
}: {
	searchParams?: { 'invalid-location': string | undefined; 'revalidate': string | undefined }
}) {
	if (searchParams && searchParams['revalidate']) {
		console.log('revalidate')
		revalidatePath('/', 'layout')
		redirect('/')
	}

	return (
		<div className='max-h-screen flex flex-col h-screen overflow-y-hidden'>
			<div className='h-[calc(100vh-80px)] grid grid-cols-10 grid-rows-[repeat(10,minmax(0px,1fr))] gap-3 bg-gradient-to-t from-background to-foreground  [&>*]:backdrop-blur-md p-3 pb-0'>
				<Card className='row-span-4 col-span-full flex items-end p-16'>
					<div className='bottom-8 flex gap-8 items-end w-full h-16'>
						<h1 className='text-7xl font-extrabold grow whitespace-nowrap leading-[0.8]'>What&apos;s the weather in</h1>
						<LocationForm invalid={searchParams && searchParams['invalid-location']}></LocationForm>
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
						<CardTitle className='font-title text-3xl pt-4'>WHAT&apos;S ZEPHYR ACTUALLY?</CardTitle>
						<h2 className='font-extrabold text-5xl'>Your Weather Companion...</h2>
						<h2 className='font-bold text-2xl'>Unlocking the Beauty of Weather.</h2>
						<p className='text-right text-justify'>
							<u>Zephyr</u> is redefining what you can expect from a weather app. It&apos;s not just about forecasts;
							it&apos;s about storytelling. Zephyr transforms weather data into immersive narratives. Explore the
							symphony of the seasons, follow the drama of weather systems, and dive into the artistry of the
							atmosphere. Zephyr is your window into the ever-changing canvas of the sky. It&apos;s where meteorology
							becomes a captivating tale, and every weather event is a chapter waiting to be discovered. Zephyr is more
							than just a weather app – it&apos;s your gateway to experiencing the weather in a whole new way. <br />{' '}
							(ChatGPT cap.)
						</p>
					</CardContent>
				</Card>
				<Card className='row-span-3 col-span-3 overflow-hidden'>
					<ScrollingText></ScrollingText>
				</Card>
			</div>
			<ThanksTo></ThanksTo>
		</div>
	)
}
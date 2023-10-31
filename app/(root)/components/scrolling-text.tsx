export default function ScrollingText() {
	return (
		<div className='w-max h-full flex flex-col justify-center'>
			{/* <div className='absolute z-10 w-screen flex justify-center items-center'>
					<div className='p-20 h-full flex items-center gap-4 bg-white rounded-xl'>
						<p className='w-full'>What's the weather in...</p>
						<Input className=''></Input>
						<Button className='aspect-square p-2'>
							<Share size={32}></Share>
						</Button>
					</div>
				</div> */}
			<ul className='flex gap-4 [&>*]:w-max animate-infinite-scroll delay-500 -translate-x-16 tracking-wide text-8xl font-title text-black '>
				<li>
					Rain showers are expected with a chance of thunderstorms later. In the morning, you can expect a light drizzle
					and overcast skies.
				</li>
				<li>
					Rain showers are expected with a chance of thunderstorms later. In the morning, you can expect a light drizzle
					and overcast skies.
				</li>
				<li>
					Rain showers are expected with a chance of thunderstorms later. In the morning, you can expect a light drizzle
					and overcast skies.
				</li>
				<li>
					Rain showers are expected with a chance of thunderstorms later. In the morning, you can expect a light drizzle
					and overcast skies.
				</li>
				<li>
					Rain showers are expected with a chance of thunderstorms later. In the morning, you can expect a light drizzle
					and overcast skies.
				</li>
			</ul>
			<ul className='flex items-center justify-center md:justify-start delay-200 [&_li]:mx-8 [&>*]:w-max animate-reverse-infinite-scroll -translate-x-16 font-title tracking-wide text-8xl'>
				<li>
					A sunny day ahead with clear skies and a gentle breeze. Enjoy the pleasant weather and don&apos;t forget your
					sunscreen!
				</li>
				<li>
					A sunny day ahead with clear skies and a gentle breeze. Enjoy the pleasant weather and don&apos;t forget your
					sunscreen!
				</li>
				<li>
					A sunny day ahead with clear skies and a gentle breeze. Enjoy the pleasant weather and don&apos;t forget your
					sunscreen!
				</li>
				<li>
					A sunny day ahead with clear skies and a gentle breeze. Enjoy the pleasant weather and don&apos;t forget your
					sunscreen!
				</li>
				<li>
					A sunny day ahead with clear skies and a gentle breeze. Enjoy the pleasant weather and don&apos;t forget your
					sunscreen!
				</li>
			</ul>
		</div>
	)
}

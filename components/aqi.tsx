import { Card, CardContent, CardTitle } from './ui/card'

type Message = {
	range: number[]
	text: string
}

const messages: Message[] = [
	{
		range: [1, 2, 3, 4, 5, 6],
		text: 'Enjoy your usual outdoor activities.'
	},
	{
		range: [7, 8, 9],
		text: 'Anyone experiencing discomfort such as sore eyes, cough or sore throat should consider reducing activity, particularly outdoors.'
	},
	{
		range: [10],
		text: 'Reduce physical exertion, particularly outdoors, especially if you experience symptoms such as cough or sore throat.'
	}
]

export default function AirQualityIndex() {
	return (
		<Card className=''>
			<CardTitle className='font-title text-xl z-10 rounded-tl-xl rounded-br-xl bg-white p-2 px-3 tracking-wide'>
				AIR QUALITY INDEX
			</CardTitle>
			<CardContent className='flex flex-col items-start h-full px-3 gap-2'>
				<h2 className='text-xl font-bold'>Good</h2>
				<p className='text-sm'>
					US EPA INDEX - <span className='font-extrabold'>3</span> <br />
					UK DEFRA INDEX - <span className='font-extrabold'>7</span>
				</p>
				<p>{messages.find(({ range: range }) => range.includes(8))?.text}</p>
			</CardContent>
		</Card>
	)
}

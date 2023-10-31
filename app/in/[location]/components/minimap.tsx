import Image from 'next/image'
import { Card, CardContent, CardTitle } from '@/components/ui/card'

type Props = { lat: string; lon: string }
export default async function Minimap({ lat, lon }: Props) {
	return (
		<Card className='row-span-2 row-start-2 col-start-5 relative'>
			<CardTitle className='font-title absolute text-xl z-10 rounded-tl-xl rounded-br-xl bg-background p-2 px-3 tracking-wide'>
				MAP
			</CardTitle>
			<CardContent className='flex items-center h-full p-0 justify-center'>
				<Image
					className='rounded-xl w-full h-full filter grayscale'
					src={`https://api.mapbox.com/styles/v1/mapbox/outdoors-v12/static/${lon},${lat},8/300x600?access_token=${process.env['MAPBOX_TOKEN']}`}
					alt='minimap'
					fill
					quality={100}
				/>
			</CardContent>
		</Card>
	)
}

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { AqiData } from '@/lib/types'
import { CornerRightDown } from 'lucide-react'

type Props = { data: AqiData['data'] }
export default function AirQualityPopover({ data }: Props) {
	return (
		<Popover>
			<PopoverTrigger>
				<u className='inline text-sm leading-tight underline-offset-2'>more info</u>
				<CornerRightDown className='inline ml-2' size={12}></CornerRightDown>
			</PopoverTrigger>
			<PopoverContent className='w-auto'>
				<p>
					CO <i>Carbon Monoxide</i> (μg/m3) - <b>{String(data.iaqi['co'].v)}</b>
				</p>
				<p>
					O3 <i>Ozone</i> (μg/m3) - <b>{String(data.iaqi['o3'].v)}</b>
				</p>
				<p>
					NO2 <i>Nitrogen dioxide</i> (μg/m3) - <b>{String(data.iaqi['no2'].v)}</b>
				</p>
				<p>
					SO2 <i>Sulphur dioxide</i> (μg/m3) - <b>{String(data.iaqi['so2'].v)}</b>
				</p>
				<p>
					PM2.5 (μg/m3) - <b>{String(data.iaqi['pm25'].v)}</b>
				</p>
				<p>
					PM10 (μg/m3) - <b>{String(data.iaqi['pm10'].v)}</b>
				</p>
			</PopoverContent>
		</Popover>
	)
}

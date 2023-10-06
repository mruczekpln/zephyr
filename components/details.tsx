import { ArrowDownFromLine, ArrowUpFromLine, CloudHail, CloudRain, CloudSnow, Wind } from 'lucide-react'

export default function Details() {
	return (
		<div className='flex w-[1200px] items-center'>
			<div className='flex items-center gap-2 w-1/3'>
				<ArrowDownFromLine />
				<p className='text-4xl font-semibold'>24</p>
				<ArrowUpFromLine />
				<p className='text-4xl font-semibold'>26</p>
				<p className='text-xl'>Celsius</p>
			</div>
			<div className='flex justify-center gap-2 items-center w-1/3'>
				<Wind size={48}></Wind>
				<span className='font-semibold text-3xl'>3</span>
				<p className='text-xl'>m/s</p>
			</div>
			<div className='w-1/3 flex justify-end items-center text-3xl'>
				<CloudRain size={32} className='mr-4'></CloudRain>
				<p className='font-semibold'>20</p>
				<span className='text-base align-middle ml-1 mr-6'>%</span>
				<CloudHail size={32} className='mr-4'></CloudHail>
				<p className='font-semibold'>0</p>
				<span className='text-base align-middle ml-1 mr-6'>%</span>
				<CloudSnow size={32} className='mr-4'></CloudSnow>
				<p className='font-semibold'>0</p>
				<span className='text-base align-middle ml-1 mr-6'>%</span>
			</div>
		</div>
	)
}

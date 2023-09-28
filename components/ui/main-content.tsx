'use client'

import { AiOutlineSearch } from 'react-icons/ai'
import { useRef, useState } from 'react'
import { Button } from './button'
import { Input } from './input'

interface Props extends React.ComponentProps<'div'> {}

export default function MainContent({ children, ...props }: Props) {
	const [isButtonVisible, setIsButtonVisible] = useState<boolean>(false)
	const [data, setData] = useState({})
	const inputRef = useRef<HTMLInputElement>(null)

	async function handleButtonClick() {
		console.log(inputRef.current?.value)
		const res = await fetch(`/api/${inputRef.current?.value || 'hi'}`)
		const data = await res.json()

		setData(data)
		setIsButtonVisible(false)
	}

	return (
		<>
			<div className='flex gap-6 items-center'>
				<div className='text-xl'>what&apos;s the weather in</div>
				<Input placeholder='' className='w-64' onFocus={() => setIsButtonVisible(true)} ref={inputRef}></Input>
				<Button
					style={{ opacity: isButtonVisible ? 1 : 0 }}
					className='transition-all duration-300'
					onClick={() => handleButtonClick()}
				>
					<AiOutlineSearch size='2x'></AiOutlineSearch>
				</Button>
			</div>
			{JSON.stringify(data['current'])}
		</>
	)
}

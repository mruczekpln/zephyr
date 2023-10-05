'use client'

import { AiOutlineSearch } from 'react-icons/ai'
import { FormEvent, FormEventHandler, useRef, useState } from 'react'
import { Button } from './button'
import { Input } from './input'
import { useRouter } from 'next/navigation'

interface Props extends React.ComponentProps<'div'> {}

export default function MainContent({ children, ...props }: Props) {
	const router = useRouter()
	const inputRef = useRef<HTMLInputElement>(null)

	function handleButtonClick(e: FormEvent) {
		e.preventDefault()

		const location = inputRef.current?.value
		console.log(location)

		location && router.push(`/in/${location}`)
	}

	return (
		<form onSubmit={handleButtonClick} className='flex gap-6 items-center'>
			<div className='text-xl'>what&apos;s the weather in</div>
			<Input placeholder='' className='w-64' ref={inputRef}></Input>
			<Button type='submit'>
				<AiOutlineSearch size='2x'></AiOutlineSearch>
			</Button>
		</form>
	)
}

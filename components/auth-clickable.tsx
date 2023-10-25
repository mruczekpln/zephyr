'use client'

import { Button } from './ui/button'
import { signIn, signOut } from 'next-auth/react'
import Link from 'next/link'

interface Props {
	clickableType: 'a' | 'button'
	authType: 'signin' | 'signout'
}

export default function AuthClickabe({ clickableType, authType }: Props) {
	if (clickableType === 'a')
		return (
			<p onClick={() => (authType === 'signin' ? signIn() : signOut())}>
				{authType === 'signin' ? 'Sign In' : 'Sign Out'}
			</p>
		)
	else
		return (
			<Button onClick={() => (authType === 'signin' ? signIn() : signOut())}>
				{authType === 'signin' ? 'Sign In' : 'Sign Out'}
			</Button>
		)
}

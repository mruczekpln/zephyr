'use client'

import { Button } from './ui/button'
import { signIn, signOut } from 'next-auth/react'

interface Props extends React.ComponentProps<'button'> {
	authType: 'signin' | 'signout'
}

export default function AuthButton({ authType }: Props) {
	return (
		<Button onClick={() => (authType === 'signin' ? signIn() : signOut())}>
			{authType === 'signin' ? 'Sign In' : 'Sign Out'}
		</Button>
	)
}

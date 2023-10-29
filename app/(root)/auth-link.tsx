// import { AuthAction } from 'next-auth'

// interface Props extends React.ComponentProps<'button'> {
// 	authAction: 'login' | 'signin' | 'signout'
// }

// const authActions: {
// 	[key in AuthAction]: {}
// } = {}

// export default function AuthButton({ authAction }: Props) {}

'use client'

import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '../../components/ui/button'

interface Props extends React.ComponentProps<'a'> {
	type?: 'logout'
}

export default function AuthLink(props: Props) {
	const pathname = usePathname()
	if (pathname.startsWith('/auth')) return <div></div>
	else if (props.type === 'logout')
		return (
			<div className='h' onClick={() => signOut()}>
				{props.children}
			</div>
		)
	else return <Link href={props.href as string}>{props.children}</Link>
}

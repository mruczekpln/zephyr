'use client'
import { ClientSafeProvider, signIn } from 'next-auth/react'

import { Github } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { OAuthProvider } from 'next-auth/providers/oauth'
import { Provider } from 'next-auth/providers/index'

type Props = { githubProvider: ClientSafeProvider } & React.ComponentProps<'button'>
export default function AuthWithGithub({ className, githubProvider }: Props) {
	return (
		<Button
			variant={'ghost'}
			className={className}
			onClick={() => signIn(githubProvider.id, { redirect: false, callbackUrl: '/' })}
		>
			<Github className={'inline mr-2'}></Github>
			Continue with GitHub
		</Button>
	)
}

import gradient from '@/public/gradient.jpeg'
import { ClientSafeProvider, getProviders } from 'next-auth/react'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import SignInForm from './signin-form'

export default async function SignIn() {
	const providers = await getProviders()
	const session = await getServerSession()
	if (session) redirect('/')

	return (
		<div className='grid grid-cols-2 w-full h-screen'>
			<div className='bg-secondary border-r relative bg-'>
				<div className='absolute inset-0 rotate-180' style={{ backgroundImage: `url(${gradient.src})` }}></div>
				<div className='absolute bottom-20 left-20 w-1/3'>
					<blockquote className='space-y-2'>
						<p className='text-lg'>
							&ldquo;Zephyr has made staying on top of the weather a breeze. It&apos;s my go-to app for accurate
							forecasts and real-time updates. Love the sleek design and user-friendly interface.&rdquo; <br />
							<u>(ChatGPT cap.)</u>
						</p>
						<footer className='text-sm'>cytryneq95</footer>
					</blockquote>
				</div>
			</div>
			<div className='flex items-center justify-center'>
				<SignInForm githubProvider={providers?.github as ClientSafeProvider}></SignInForm>
			</div>
		</div>
	)
}

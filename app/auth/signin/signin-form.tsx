'use client'

import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ClientSafeProvider } from 'next-auth/react'
import AuthWithGithub from '../auth-with-github'
import { useState } from 'react'

const validationSchema = z
	.object({
		name: z.string().min(4, { message: 'Name is required' }),
		email: z.string().min(5, { message: 'Email is required' }).email({
			message: 'Invalid email'
		}),
		confirmEmail: z.string().min(5, { message: 'Confirm Password is required' }),
		password: z.string().min(6, { message: 'Password must be atleast 6 characters' })
	})
	.refine(data => data.email === data.confirmEmail, {
		path: ['confirmEmail'],
		message: "Emails don't match"
	})

type ValidationSchema = z.infer<typeof validationSchema>

type Props = { githubProvider: ClientSafeProvider } & React.ComponentProps<'button'>
export default function SignInForm({ githubProvider }: Props) {
	const [loading, setLoading] = useState<boolean>(false)
	const [created, setCreated] = useState<boolean>(false)
	const router = useRouter()

	const form = useForm<ValidationSchema>({
		resolver: zodResolver(validationSchema),
		defaultValues: {
			name: '',
			email: '',
			confirmEmail: '',
			password: ''
		}
	})

	const onSubmit: SubmitHandler<ValidationSchema> = async credentials => {
		setLoading(true)

		const response = await fetch('/api/users/create', {
			method: 'POST',
			body: JSON.stringify(credentials),
			headers: { 'Content-Type': 'application/json' }
		})

		const data: { redirect: boolean; message?: string } = await response.json()
		if (data.message) {
			form.setError('email', { type: 'custom', message: data.message })
			form.setError('name', { type: 'custom', message: data.message })
		} else {
			setCreated(true)
		}

		console.log(data)
		setLoading(false)
	}

	if (!created) {
		return (
			<div className='mx-auto flex flex-col justify-center space-y-4 w-[350px]'>
				<div className='flex flex-col space-y-2 text-center'>
					<h1 className='text-4xl font-semibold tracking-tight font-title'>Create an account</h1>
					<p className='text-sm text-muted-foreground'>Fill the fields to create your account.</p>
				</div>
				<AuthWithGithub githubProvider={githubProvider}></AuthWithGithub>
				<Separator></Separator>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='w-full flex flex-col gap-2'>
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem className='relative'>
									<FormControl>
										<Input disabled={loading} placeholder='username' {...field}></Input>
									</FormControl>
									<FormMessage className='float-right text-xs'></FormMessage>
								</FormItem>
							)}
						></FormField>
						<Separator className={`my-2 ${form.formState.errors.name && 'mt-0'}`}></Separator>
						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input disabled={loading} placeholder='e-mail adress' {...field}></Input>
									</FormControl>
									<FormMessage className='float-right text-xs'></FormMessage>
								</FormItem>
							)}
						></FormField>
						<FormField
							control={form.control}
							name='confirmEmail'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input disabled={loading} placeholder='repeat e-mail adress' {...field}></Input>
									</FormControl>
									<FormMessage className='float-right text-xs'></FormMessage>
								</FormItem>
							)}
						></FormField>
						<Separator className={`my-2 ${form.formState.errors.confirmEmail && 'mt-0'}`}></Separator>
						<FormField
							control={form.control}
							name='password'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input disabled={loading} type='password' placeholder='password' {...field}></Input>
									</FormControl>
									<FormMessage className='float-right text-xs'></FormMessage>
								</FormItem>
							)}
						></FormField>
						<Separator className={`my-2 ${form.formState.errors.password && 'mt-0'}`}></Separator>
						<Button disabled={loading} type='submit'>
							Create account!
						</Button>
					</form>
				</Form>
				<p className='px-8 text-center text-sm text-muted-foreground'>
					Already have an account?{' '}
					<Link href='/auth/login' className='underline underline-offset-4 hover:text-primary cursor-pointer'>
						Log in
					</Link>
				</p>
			</div>
		)
	} else {
		return (
			<div className='flex flex-col items-center gap-8'>
				<h3 className='font-title text-5xl w-full text-center'>Sucessfully created an account.</h3>
				<Link href='/auth/login'>
					<Button variant='ghost'>Go to log in page!</Button>
				</Link>
			</div>
		)
	}
}

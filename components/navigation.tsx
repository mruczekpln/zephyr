import { Bird, LogOut, Moon, Search, Sun, User, UserCircle2 } from 'lucide-react'
import { getServerSession } from 'next-auth'
import { signOut } from 'next-auth/react'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'
import AuthClickabe from './auth-clickable'
import ThemeSwitch from './theme-switch'
import { Avatar } from './ui/avatar'
import { Button } from './ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuSeparator,
	DropdownMenuLabel,
	DropdownMenuTrigger,
	DropdownMenuItem
} from './ui/dropdown-menu'

export default async function Navigation() {
	const session = await getServerSession()

	return (
		<div className='flex items-center h-auto top-16 w-full max-w-screen overflow-x-hidden px-20 mx-auto z-10 absolute'>
			<Link href={'/'} className='text-xl flex gap-2 items-center'>
				<Bird color='black' size={32} />
				<p>zephyr </p>
			</Link>
			<ul></ul>
			<div className='grow-[2] flex justify-end'>
				<div className=' flex gap-4 items-center'>
					{/* <ThemeSwitch></ThemeSwitch> */}
					{/* <div className='w-10 aspect-square bg-black rounded-full'></div> */}
					{!session ? (
						<AuthClickabe clickableType='button' authType='signin'></AuthClickabe>
					) : (
						<>
							<DropdownMenu>
								<DropdownMenuTrigger className='cursor-pointer underline outline-none'>
									{session.user?.name}
								</DropdownMenuTrigger>
								<DropdownMenuContent className='w-48'>
									<DropdownMenuLabel>My Account</DropdownMenuLabel>
									<DropdownMenuSeparator />
									<DropdownMenuItem>
										<User className='inline mr-2' size={16}></User>
										Profile
									</DropdownMenuItem>
									<DropdownMenuItem>
										<Search className='inline mr-2' size={16}></Search>
										Latest Searches
									</DropdownMenuItem>
									<DropdownMenuSeparator />
									<DropdownMenuItem className='text-destructive focus:text-destructive'>
										<LogOut className='inline mr-2' size={16}></LogOut>
										<AuthClickabe clickableType='a' authType='signout'></AuthClickabe>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
							<Avatar className='items-center'>
								{<Image src={session.user?.image as string} alt='' fill></Image> || (
									<UserCircle2 size={64}></UserCircle2>
								)}
							</Avatar>
						</>
					)}
				</div>
			</div>
		</div>
	)
}

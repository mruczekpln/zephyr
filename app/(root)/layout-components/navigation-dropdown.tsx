import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuItem
} from '@/components/ui/dropdown-menu'
import { User, Search, LogOut, Cog } from 'lucide-react'
import Link from 'next/link'
import AuthLink from './auth-link'
import { ReactNode } from 'react'

export default function NavigationDropdown({ userName }: { userName: string | ReactNode }) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className='cursor-pointer outline-none'>{userName}</DropdownMenuTrigger>
			<DropdownMenuContent className='w-48'>
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<Link href='/account/info' className='w-full'>
						<User className='inline mr-2' size={16}></User>
						Profile
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem>
					<Link href='/account/history' className='w-full'>
						<Search className='inline mr-2' size={16}></Search>
						Latest Searches
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem>
					<Link href='/account/settings' className='w-full'>
						<Cog className='inline mr-2' size={16}></Cog>
						Preferences
					</Link>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<AuthLink type='logout'>
					<DropdownMenuItem className='text-destructive focus:text-destructive'>
						<LogOut className='inline mr-2' size={16}></LogOut>
						Log out
					</DropdownMenuItem>
				</AuthLink>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

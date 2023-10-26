import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuItem
} from './ui/dropdown-menu'
import { User, Search, LogOut, Cog } from 'lucide-react'
import Link from 'next/link'
import AuthClickabe from './auth-clickable'

export default function AccountDropdown({ userName }: { userName: string }) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className='cursor-pointer underline outline-none'>{userName}</DropdownMenuTrigger>
			<DropdownMenuContent className='w-48'>
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<Link href='/account'>
						<User className='inline mr-2' size={16}></User>
						Profile
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem>
					<Link href='/account/history'>
						<Search className='inline mr-2' size={16}></Search>
						Latest Searches
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem>
					<Link href='/account/settings'>
						<Cog className='inline mr-2' size={16}></Cog>
						Preferences
					</Link>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem className='text-destructive focus:text-destructive'>
					<LogOut className='inline mr-2' size={16}></LogOut>
					<AuthClickabe clickableType='a' authType='signout'></AuthClickabe>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

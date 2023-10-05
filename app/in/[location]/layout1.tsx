import { ReactNode } from 'react'

export default function InLayout({ children }: { children: ReactNode }) {
	return <section>{children}</section>
}

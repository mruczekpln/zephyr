'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function GoBack() {
	const router = useRouter()
	router.push('/?invalid-location=true')

	return <Button>Go back</Button>
}

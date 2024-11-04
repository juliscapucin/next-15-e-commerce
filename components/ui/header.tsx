"use client"

import { useUser } from "@clerk/nextjs"
import Link from "next/link"

export default function Header() {
	const user = useUser()

	return (
		<header>
			<div>
				<Link href='/'>Home</Link>
			</div>
		</header>
	)
}

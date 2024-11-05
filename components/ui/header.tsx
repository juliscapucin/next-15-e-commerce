"use client"

import {
	ClerkLoaded,
	SignedIn,
	SignedOut,
	SignInButton,
	UserButton,
	useUser,
} from "@clerk/nextjs"
import Link from "next/link"
import Form from "next/form"
import { PackageIcon, TrolleyIcon } from "@sanity/icons"

const navigationLinks = [
	{ href: "/", label: "Home" },
	{ href: "/about", label: "About" },
	{ href: "/shop", label: "Shop" },
	{ href: "/contact", label: "Contact" },
]

export default function Header() {
	const { user } = useUser()

	const createClerkPasskey = async () => {
		try {
			const response = await user?.createPasskey()
			console.log(response)
		} catch (err) {
			console.error("Error:", JSON.stringify(err, null, 2))
		}
	}

	return (
		<header className='flex justify-between'>
			<Link href='/'>Home</Link>
			<nav className='flex gap-4'>
				{navigationLinks.map((link) => (
					<Link key={link.href} href={link.href}>
						{link.label}
					</Link>
				))}
			</nav>
			<Form action={"/search"}>
				<input
					className='bg-gray-100 border rounded-sm px-4 py-2'
					type='text'
					name='query'
					placeholder='Search for products'
				/>
			</Form>

			<Link
				href='/basket'
				className='bg-black text-white flex justify-center items-center rounded-sm px-4 py-2'
			>
				<TrolleyIcon />
				<span>My Basket</span>
			</Link>

			{/* User Area */}
			<ClerkLoaded>
				{user && (
					<Link
						href='/orders'
						className='bg-gray-400 flex justify-center items-center rounded-sm px-4 py-2'
					>
						<PackageIcon className='w-6 h-6' />
						<span>My Orders</span>
					</Link>
				)}

				<SignedOut>
					<SignInButton mode='modal' />
				</SignedOut>
				<SignedIn>
					<div className='flex items-center gap-2'>
						<UserButton />
						<span>Welcome back, {user?.fullName}!</span>
					</div>
				</SignedIn>

				{/* Passkey Area */}
				<SignedIn>
					<button onClick={createClerkPasskey}>Create Passkey</button>
				</SignedIn>
			</ClerkLoaded>
		</header>
	)
}

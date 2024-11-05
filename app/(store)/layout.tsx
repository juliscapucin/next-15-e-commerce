import type { Metadata } from "next"
import localFont from "next/font/local"
import "./../globals.css"

import {
	ClerkProvider,
	SignInButton,
	SignedIn,
	SignedOut,
	UserButton,
} from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import Header from "@/components/ui/header"

const geistSans = localFont({
	src: "./../fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
})
const geistMono = localFont({
	src: "./../fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
})

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<ClerkProvider dynamic>
			<html lang='en'>
				<body
					className={`${geistSans.variable} ${geistMono.variable} antialiased`}
				>
					<main className='p-4 h-screen bg-gray-50 text-black'>
						<Header />
						{children}
						{/* <Button variant='default' size='lg'>
							Click me
						</Button>
						<Button variant='outline' size='lg'>
							Click me
						</Button> */}
					</main>
				</body>
			</html>
		</ClerkProvider>
	)
}

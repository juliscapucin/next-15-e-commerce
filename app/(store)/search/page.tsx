import React from "react"

type SearchPageProps = {
	searchParams: { query: string }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
	const { query } = await searchParams

	return <div>Search Page for {query}</div>
}

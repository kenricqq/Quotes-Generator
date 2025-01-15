import { json } from '@sveltejs/kit'

export async function GET() {
	const res = await fetch('https://zenquotes.io/?api=random')
	const data = await res.json()

	return json(data)
}

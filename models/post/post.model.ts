import type { $DATE, OID } from '@/models/body.model'

export type Post = {
	_id: OID
	profile: {
		user: {
			name: string
		}
		avatar: string
	}
	content: string
	images?: Array<string>
	likes: number
	date: $DATE
}

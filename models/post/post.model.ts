import type { $DATE, OID } from '@/models/body.model'

export type Post = {
	_id: OID
	profile: {
		user: {
			_id: OID
			name: string
		}
		avatar: string
	}
	content: string
	images?: Array<string>
	likes: number
	is_visible: boolean
	date: $DATE
}

export type PostUpdate = {
	content?: string
	is_visible?: boolean
}

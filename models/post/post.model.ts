import type { Category } from '@/models/category/category.model'
import type { $DATE, OID } from '@/models/body.model'

export type Post = {
	_id: OID
	profile: OID
	content: string
	likes: number
	date: $DATE
}

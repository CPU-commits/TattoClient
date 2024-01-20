import type { Category } from '@/models/category/category.model'
import type { $DATE, OID } from '@/models/body.model'
import type { User } from '@/models/user/user.model'

export type Profile = {
	_id: OID
	user: User
	description: string
	avatar: string
	likes: number
	categories: Array<Category>
	nickname: string
	date: $DATE
}

import type { $DATE, OID } from '../body.model'
import type { Category } from './category.model'

export type Tattoo = {
	_id: OID
	profile: string
	image: string
	categories: Array<Category>
	likes: number
	date: $DATE
}

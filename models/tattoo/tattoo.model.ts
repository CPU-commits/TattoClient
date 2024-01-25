import type { $DATE } from '../body.model'
import type { Category } from './category.model'

export type Tattoo = {
	profile: string
	image: string
	categories: Array<Category>
	likes: number
	date: $DATE
}

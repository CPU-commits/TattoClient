import { Service } from './service'
import type { BodyFetch } from '~/models/body.model'
import type { Category } from '~/models/tattoo/category.model'

export class CategoryService extends Service {
	async getCategories() {
		return await this.fetch<
			BodyFetch<{
				categories: Array<Category>
			}>
		>({
			method: 'get',
			URL: `/api/v1/categories`,
		}).then(({ body }) => body.categories)
	}
}

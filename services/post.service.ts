import { Service } from './service'
import type { BodyFetch } from '@/models/body.model'
import type { Post } from '@/models/post/post.model'

export class PostService extends Service {
	async postPost() {
		return await this.fetch<BodyFetch<Post>>({
			method: 'post',
			URL: `/api/v1/post/`,
		})
	}

	async getPost(
		nickname: string,
		page: number = 1,
		itemsPerPage: number = 999,
	) {
		return await this.fetch<
			BodyFetch<{
				posts: Array<Post>
			}>
		>({
			method: 'get',
			URL: `/api/v1/posts/${nickname}?page=${page}&items_per_page=${itemsPerPage}`,
		}).then(({ body }) => body)
	}
}

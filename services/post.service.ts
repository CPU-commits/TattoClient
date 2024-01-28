import { Service } from './service'
import type { BodyFetch, QueryParams } from '@/models/body.model'
import type { Post } from '@/models/post/post.model'

export class PostService extends Service {
	async postPost() {
		return await this.fetch<BodyFetch<Post>>({
			method: 'post',
			URL: `/api/v1/post/`,
		})
	}

	async getPosts(nickname: string, params?: QueryParams) {
		return await this.fetch<
			BodyFetch<{
				posts: Array<Post>
			}>
		>({
			method: 'get',
			URL: `/api/v1/posts/${nickname}`,
			params,
		}).then(({ body, headers }) => ({
			posts: body.posts,
			count: parseInt(headers.get('X-Count')),
		}))
	}
}

import { Service } from './service'
import type { BodyFetch, QueryParams } from '@/models/body.model'
import type { Post } from '@/models/post/post.model'

export class PostService extends Service {
	async uploadPost(content: string, images: Array<File>) {
		const formData = new FormData()
		formData.append('content', content)
		images.forEach((images) => formData.append('files', images))
		return await this.fetch({
			method: 'post',
			URL: `/api/v1/posts`,
			body: formData,
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

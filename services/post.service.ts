import { Service } from './service'
import type { BodyFetch, QueryParams } from '@/models/body.model'
import type { Post, PostUpdate } from '@/models/post/post.model'

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

	async getPost(idPost: string) {
		return await this.fetch<
			BodyFetch<{
				post: Post
			}>
		>({
			method: 'get',
			URL: `/api/v1/posts/post/${idPost}`,
		}).then(({ body }) => ({
			post: body.post,
		}))
	}

	async likePost(idPost: string) {
		const formData = new FormData()
		formData.append('id_post', idPost)
		return await this.fetch({
			method: 'post',
			URL: `/api/v1/posts/like`,
			body: formData,
		})
	}

	async deletePost(idPost: string) {
		return await this.fetch({
			method: 'delete',
			URL: `/api/v1/posts/${idPost}`,
		})
	}

	async updatePost(idPost: string, postUpdate: PostUpdate) {
		return await this.fetch({
			method: 'patch',
			URL: `/api/v1/posts/${idPost}`,
			body: postUpdate,
		})
	}

	async updatePositionPost(nickname: string, posts: Array<Post>) {
		const formData = new FormData()
		posts.map((post) => formData.append('posts', JSON.stringify(post)))
		return await this.fetch({
			method: 'patch',
			URL: `/api/v1/posts/pos/${nickname}`,
			body: formData,
		})
	}
}

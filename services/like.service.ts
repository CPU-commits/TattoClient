import { Service } from './service'
import type { BodyFetch } from '@/models/body.model'
import type { Like } from '~/models/like/like.model'

export class LikeService extends Service {
	async getLike() {
		return await this.fetch<
			BodyFetch<{
				likes: Array<Like>
			}>
		>({
			method: 'get',
			URL: `/api/v1/likes`,
		}).then(({ body }) => body.likes)
	}
}

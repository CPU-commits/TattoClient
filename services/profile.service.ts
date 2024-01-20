import { Service } from './service'
import type { BodyFetch } from '@/models/body.model'
import type { Profile } from '@/models/profile/profile.model'

export class ProfileService extends Service {
	async getProfile(nickname: string) {
		return await this.fetch<BodyFetch<Profile>>({
			method: 'get',
			URL: `/api/v1/profiles/${nickname}`,
		}).then(({ body }) => body)
	}

	async changeAvatar() {
		const formData = new FormData()

		return await this.fetch({
			method: 'patch',
			URL: '/api/v1/profiles/avatar',
			body: formData,
		})
	}
}

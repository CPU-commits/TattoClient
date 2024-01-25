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

	async changeAvatar(file: File) {
		const formData = new FormData()
		formData.append('avatar', file)

		return await this.fetch<BodyFetch<string>>({
			method: 'patch',
			URL: '/api/v1/profiles/avatar',
			body: formData,
		}).then(({ body }) => body)
	}
}

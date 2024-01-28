import { Service } from './service'
import type { Tattoo } from '~/models/tattoo/tattoo.model'
import type { BodyFetch } from '~/models/body.model'

export class TattooService extends Service {
	async getTattoosNickname(nickname: string) {
		return await this.fetch<
			BodyFetch<{
				tattoos: Array<Tattoo>
			}>
		>({
			method: 'get',
			URL: `/api/v1/tattoos/user/${nickname}`,
		}).then(({ body }) => body.tattoos)
	}
}

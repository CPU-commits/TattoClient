import { Service } from './service'
import type { Tattoo } from '~/models/tattoo/tattoo.model'
import type { BodyFetch, QueryParams } from '~/models/body.model'

export class TattooService extends Service {
	async getTattoosNickname(nickname: string, params?: QueryParams) {
		return await this.fetch<
			BodyFetch<{
				tattoos: Array<Tattoo>
			}>
		>({
			method: 'get',
			URL: `/api/v1/tattoos/user/${nickname}`,
			params,
		}).then(({ body, headers }) => ({
			tattoos: body.tattoos,
			max_tattoos: parseInt(headers.get('X-Count')),
		}))
	}

	async getLatestTattoosNickname(nickname: string) {
		return await this.fetch<
			BodyFetch<{
				tattoos: Array<Tattoo>
			}>
		>({
			method: 'get',
			URL: `/api/v1/tattoos/user/${nickname}/latest`,
		}).then(({ body }) => body.tattoos)
	}

	async uploadTattoos(tattoos: Array<File>, categories: Array<string>) {
		// Validate
		if (tattoos.length === 0)
			throw new Error('Debe seleccionar mínimo una imagen de tatuaje')
		if (categories.length === 0)
			throw new Error('Debe seleccionar al menos una etiqueta')
		// Body
		const formData = new FormData()
		tattoos.forEach((tattoo) => formData.append('files', tattoo))
		categories.forEach((category) =>
			formData.append('categories', category),
		)

		await this.fetch({
			method: 'post',
			URL: `/api/v1/tattoos`,
			body: formData,
		})
	}
}

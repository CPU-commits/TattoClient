// Services
import { Fetch } from '@/common/fetchModule'

export default defineNuxtPlugin(() => {
	const fetch = new Fetch()
	return {
		provide: {
			fetchModule: fetch,
		},
	}
})

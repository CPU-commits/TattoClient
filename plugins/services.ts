// Services
import { Fetch } from '@/common/fetchModule'
import { AuthService } from '@/services/auth.service'
import { ProfileService } from '@/services/profile.service'

export default defineNuxtPlugin(() => {
	const fetch = new Fetch()
	return {
		provide: {
			fetchModule: fetch,
			authService: new AuthService(fetch),
			profileService: new ProfileService(fetch),
		},
	}
})

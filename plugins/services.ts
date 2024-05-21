// Services
import { Fetch } from '@/common/fetchModule'
import { AuthService } from '@/services/auth.service'
import { ProfileService } from '@/services/profile.service'
import { CategoryService } from '~/services/category.service'
import { PostService } from '@/services/post.service'
import { TattooService } from '~/services/tatto.service'
import { CalendarService } from '~/services/calendar.service'

export default defineNuxtPlugin(() => {
	const fetch = new Fetch()
	return {
		provide: {
			fetchModule: fetch,
			authService: new AuthService(fetch),
			profileService: new ProfileService(fetch),
			postService: new PostService(fetch),
			tattooService: new TattooService(fetch),
			categoryService: new CategoryService(fetch),
			calendarService: new CalendarService(fetch),
		},
	}
})

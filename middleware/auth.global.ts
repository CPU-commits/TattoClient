import { AuthData } from '@/stores/useAuthStore'

export default defineNuxtRouteMiddleware(async (_to, from) => {
	if (useError().value || process.server) return
	let isAuth = true
	if (!useAuthStore().isAuth) {
		const { session } = await useSession<AuthData | undefined>()
		if (session.value?.data?.access_token) {
			useAuthStore().setAuth({
				access_token: session.value?.data.access_token,
				user: session.value?.data.user,
			})
		} else isAuth = false
	}
	const auth = _to.meta?.auth ?? false
	if (auth && !isAuth)
		return navigateTo({
			path: '/login',
			query: {
				redirect: from.path,
			},
		})
})

import { defineStore } from 'pinia'
import type { BodyFetch } from '@/models/body.model'
import { UserTypes } from '~~/models/user/user.model'
import { formatUserType } from '~~/utils/format'

type KeysUserTypes = keyof typeof UserTypes

export interface AuthData {
	token: string
	user: {
		id: string
		name: string
		role: KeysUserTypes
		email: string
		nickname: string
	}
}

async function logIn(userForm: { email: string; password: string }) {
	const { $fetchModule } = useNuxtApp()
	try {
		const dataFetch = await $fetchModule.fetchData<BodyFetch<AuthData>>({
			method: 'post',
			URL: '/api/v1/auth',
			body: userForm,
		})
		return dataFetch.body
	} catch {
		throw new Error('Credenciales inválidas')
	}
}

async function logOut() {
	const { remove } = await useSession()
	await remove()
}

const useAuthStore = defineStore('auth', {
	state: () => ({
		isAuth: false,
		user: null as AuthData | null,
	}),
	getters: {
		getIsAuth(state) {
			return state.isAuth
		},
		getUser(state): AuthData | null {
			return state.user
		},
		getToken(state): string | null {
			return state.user?.token ?? null
		},
		getUserType(state): KeysUserTypes | null {
			return state.user?.user.role ?? null
		},
		getName(state): string | null {
			return state.user?.user.name ?? null
		},
		getID(state): string | null {
			return state.user?.user.id ?? null
		},
		getUserTypeName(state) {
			if (!state.user?.user.role) return ''
			return formatUserType(state.user?.user.role)
		},
		getNickname(state) {
			return state.user.user.nickname
		},
		isOwnProfile(state) {
			const nickname = useRoute().params.nickname
			if (!nickname || typeof nickname === 'object') return false

			return nickname === state.user.user.nickname
		},
	},
	actions: {
		unsetAuth() {
			this.isAuth = false
			this.user = null
		},
		async logIn(userForm: { email: string; password: string }) {
			const consent = useConsent()
			if (consent.value) {
				const dataFetch = await logIn(userForm)
				await this.setAuth({
					user: dataFetch.user,
					token: dataFetch.token,
				})
			} else {
				useToastsStore().addToast({
					message: 'No tienes las cookies activadas',
					type: 'error',
				})
			}
		},
		async logOut() {
			await logOut()
			this.unsetAuth()
		},
		async setAuth(user: AuthData) {
			this.isAuth = true
			this.user = user

			const { overwrite } = await useSession()
			await overwrite(user)
		},
		userTypeNotIs(...userTypes: KeysUserTypes[]) {
			return !userTypes.includes(this.getUserType as never)
		},
		userTypeIs(...userTypes: KeysUserTypes[]) {
			return userTypes.includes(this.getUserType as never)
		},
	},
})

export default useAuthStore

import { z } from 'zod'
import { Service } from './service'
import { isEmailMsg } from '@/utils/messages'

export class AuthService extends Service {
	private validateRegister(user: {
		email: string
		name: string
		password: string
	}) {
		const schema = z.object({
			email: z
				.string()
				.min(1, { message: minLengthMsg(1, 'email') })
				.email({ message: isEmailMsg('email') }),
			name: z
				.string()
				.min(1, { message: minLengthMsg(1, 'nombre') })
				.max(100, { message: maxLengthMsg(100, 'nombre') }),
			password: z
				.string()
				.min(8, { message: minLengthMsg(8, 'contraseña') })
				.max(100, { message: maxLengthMsg(100, 'contraseña') }),
		})

		schema.parse(user)
	}

	async register(user: {
		email: string
		name: string
		password: string
		role: string
	}) {
		try {
			this.validateRegister(user)
			await this.fetch({
				method: 'post',
				body: user,
				URL: '/api/v1/users',
			})
			await this.authStore.logIn({
				email: user.email,
				password: user.password,
			})
			this.goto('/')
		} catch (err) {
			this.addErrorToast(err)
		}
	}

	async login(user: { email: string; password: string }) {
		try {
			await this.authStore.logIn({
				email: user.email,
				password: user.password,
			})
			this.goto('/')
		} catch (err) {
			this.addErrorToast(err)
		}
	}
}

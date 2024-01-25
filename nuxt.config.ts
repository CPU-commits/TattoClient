import eslint from 'vite-plugin-eslint'
import { Logger } from './utils/logs'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	runtimeConfig: {
		// Public
		public: {
			API: 'http://localhost:6060',
		},
		cookies: {
			CRYPTO_KEY: 'E(H+MbQeThWmZq3t6w9z$C&F)J@NcRfU',
			EXPIRY_IN_SECONDS: 3600,
		},
		redis: {
			user: 'default',
			host: 'localhost',
			port: 6379,
			password: 'MDNcVb924a',
		},
	},
	typescript: {
		strict: false,
		typeCheck: true,
	},
	css: ['@/assets/scss/main.scss'],
	modules: ['@pinia/nuxt', 'nuxt-security', '@nuxt/image'],
	imports: {
		dirs: ['stores'],
	},
	ssr: true,
	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					additionalData:
						'@use "@/assets/scss/_variables.scss" as *;',
				},
			},
		},
		plugins: [eslint()],
	},
	app: {
		head: {
			title: 'Tatto',
			htmlAttrs: {
				lang: 'es',
			},
		},
	},
	hooks: {
		ready(nuxt) {
			const logger = new Logger()
			logger.info({
				message: `Ready nuxt app ${nuxt._version}`,
				context: 'nuxt:app',
				labels: ['init', 'server', 'client'],
			})
		},
		listen() {
			const logger = new Logger()
			logger.info({
				message: 'Listen nuxt app on port 3000',
				context: 'nuxt:app',
				labels: ['init', 'server', 'client'],
			})
		},
		close() {
			const logger = new Logger()
			logger.warn({
				message: 'Nuxt app stopped',
				context: 'nuxt:app',
				labels: ['init', 'server', 'client'],
			})
		},
	},
	security: {
		headers: {
			contentSecurityPolicy: {
				'img-src': ['*', 'self', 'data:', 'https:'],
			},
		},
	},
})

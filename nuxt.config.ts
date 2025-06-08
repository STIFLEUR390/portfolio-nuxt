// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
				css: [
								// "~/assets/css/aos.css",
								// "~/assets/css/bootstrap.min.css",
								"~/assets/css/iconoir.css",
								'bootstrap/dist/css/bootstrap.css',
								"~/assets/css/style.css",
								"~/assets/css/all.css"
				],

				modules: ['@pinia/nuxt', 'pinia-plugin-persistedstate/nuxt', "@nuxtjs/mdc"],
				plugins: [{ src: "@/plugins/aos", ssr: false }],

				runtimeConfig: {
								public: {
												apiUrl: process.env.NUXT_PUBLIC_API_URL || 'https://portfolio-api.whatboost.net/api'
								}
				},

				piniaPluginPersistedstate: {
								storage: 'localStorage',
								debug: false
				},

				experimental: {
								payloadExtraction: false,
								renderJsonPayloads: false,
								asyncContext: true
				},

				app: {
								head: {
												meta: [
																{ charset: 'utf-8' },
																{ name: 'viewport', content: 'width=device-width, initial-scale=1' }
												]
								}
				}
});
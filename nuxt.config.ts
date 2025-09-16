// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  ssr: false,
  css: ['~/assets/scss/main.scss'],
  devtools: { enabled: true },
  devServer: {
    port: process.env.NODE_SERVER_PORT as unknown as number
  },
  modules: [
    '@vee-validate/nuxt',
    '@sidebase/nuxt-auth',
    'vuetify-nuxt-module',
    '@pinia/nuxt'
  ],
  runtimeConfig: {
    public: {
      apiBaseURL: process.env.NUXT_PUBLIC_API_BASE_URL,
      serverBaseURL: process.env.NUXT_PUBLIC_SERVER_BASE_URL
    }
  },
  auth: {
    globalAppMiddleware: true,
    provider: {
      type: 'local',
      pages: {
        login: '/login'
      },
      endpoints: {
        signIn: { path: '/signin', method: 'post' },
        // signOut: { path: '/logout', method: 'post' },
        getSession: { path: '/user', method: 'get' }
      },
      token: {
        maxAgeInSeconds: 60 * 60 * 8 // 8 hours
      }
    }
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/scss/variables.scss" as *;'
        }
      }
    }
  },
  vuetify: {
    vuetifyOptions: './config/vuetify.config.ts'
  }
})

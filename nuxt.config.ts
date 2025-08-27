// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  ssr: false,
  css: ['~/assets/scss/main.scss'],
  devtools: { enabled: true },
  modules: [
    '@vee-validate/nuxt',
    '@sidebase/nuxt-auth',
    'vuetify-nuxt-module',
    '@pinia/nuxt'
  ],
  runtimeConfig: {
    public: {
      baseURL: process.env.API_BASE_URL,
      serverBaseURL: process.env.SERVER_BASE_URL
    }
  },
  auth: {
    baseURL: `${process.env.API_BASE_URL}/auth`,
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
  }
  // pinia: {
  //   storesDirs: ['./app/stores/**']
  // }
})

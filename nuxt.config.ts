// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  css: ['~/assets/scss/main.scss'],
  runtimeConfig: {
    public: {
      baseURL: process.env.API_BASE_URL,
      serverBaseURL: process.env.SERVER_BASE_URL
    }
  },
  modules: [
    '@nuxtjs/eslint-module',
    '@invictus.codes/nuxt-vuetify',
    '@vee-validate/nuxt',
    '@sidebase/nuxt-auth'
  ],
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
    vuetifyOptions: {
      theme: {
        themes: {
          light: {
            dark: false,
            colors: {
              primary: '#5e5ac8',
              secondary: '#63f60e'
            }
          }
        }
      }
    },
    moduleOptions: {}
  },
  auth: {
    provider: {
      type: 'local',
      pages: {
        login: '/login'
      },
      endpoints: {
        signIn: { path: '/sign', method: 'post' },
        // signOut: { path: '/logout', method: 'post' },
        getSession: { path: '/user', method: 'get' }
      },
      token: {
        maxAgeInSeconds: 60 * 60 * 8 // 8 hours
      }
    },
    baseURL: `${process.env.API_BASE_URL}/auth`,
    globalAppMiddleware: true
  },
  build: {
    transpile: ['@vuepic/vue-datepicker']
  }
})

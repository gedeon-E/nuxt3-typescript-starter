import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    theme: {
      themes: {
        light: {
          dark: false,
          colors: {
            primary: '#2196f3',
            secondary: '#ffc107'
          }
        }
      }
    }
  })
  app.vueApp.use(vuetify)
})

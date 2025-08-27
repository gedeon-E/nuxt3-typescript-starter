import { defineStore } from 'pinia'

// eslint-disable-next-line import/prefer-default-export
export const useAlertStore = defineStore('alert', {
  state: () => ({
    message: '',
    visible: false
  }),
  actions: {
    showAlert (message: string) {
      this.message = message
      this.visible = true
    },
    hideAlert () {
      this.visible = false
    }
  }
})

import { defineStore } from 'pinia'

// eslint-disable-next-line import/prefer-default-export
export const useSnackbarStore = defineStore('snackbar', {
  state: () => ({
    message: '',
    type: '',
    visible: false
  }),
  actions: {
    showSuccessSnackbar (message: string) {
      this.message = message
      this.type = 'success'
      this.visible = true
    },
    showErrorSnackbar (message: string) {
      this.message = message
      this.type = 'red'
      this.visible = true
    },
    hideSnackbar () {
      this.visible = false
    }
  }
})

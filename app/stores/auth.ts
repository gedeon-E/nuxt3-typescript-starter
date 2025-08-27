import { defineStore } from 'pinia'

// eslint-disable-next-line import/prefer-default-export
export const useAuthStore = defineStore('auth', {
  actions: {
    signInWithOtpVerification (payload: { email: string }) {
      return useFetchApi<{ token: string }>('/auth/signin', {
        method: 'POST',
        body: payload
      })
    }
  }
})

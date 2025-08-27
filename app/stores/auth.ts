import { defineStore } from 'pinia'

// eslint-disable-next-line import/prefer-default-export
export const useAuthStore = defineStore('auth', () => {
  const { $fetchApi } = useNuxtApp()

  function signInWithOtpVerification (payload: { email: string }) {
    return $fetchApi<{ token: string }>('/auth/signin', {
      method: 'POST',
      body: payload
    })
  }

  return {
    signInWithOtpVerification
  }
})

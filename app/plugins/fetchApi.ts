export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const { token } = useAuth()

  const baseURL = config.public.apiBaseURL

  const fetchApi = $fetch.create({
    baseURL,
    onRequest: ({ options }) => {
      if (token) {
        options.headers.set('Authorization', token.value as string)
      }
    },
    onResponseError: ({ response }) => {
      HttpErrorHandler.handleFetchError(response)
    }
  })

  return {
    provide: {
      fetchApi
    }
  }
})

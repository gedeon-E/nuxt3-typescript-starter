export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const { token } = useAuth()

  const baseURL = config.public.apiBaseURL

  const headers: HeadersInit = {}

  if (token.value) {
    headers.Authorization = `${token.value}`
  }

  const fetchApi = $fetch.create({
    baseURL,
    headers: { ...headers },
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

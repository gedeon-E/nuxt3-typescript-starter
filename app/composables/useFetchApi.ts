// eslint-disable-next-line import/prefer-default-export
export const useFetchApi = <DataType = unknown>(
  requestUrl: string,
  opts: Record<string, unknown>
) => {
  const config = useRuntimeConfig()
  const { token } = useAuth()

  const options = { ...opts }

  if (token) {
    options.headers = {
      Authorization: `${token.value}`
    }
  }

  return useFetch<DataType>(requestUrl, {
    baseURL: config.public.apiBaseURL,
    ...options,
    onResponseError: ({ response }) => {
      console.log(response)

      HttpErrorHandler.handleFetchError(response)
    }
  })
}

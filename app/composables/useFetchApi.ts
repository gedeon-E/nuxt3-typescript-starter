import type { UseFetchOptions } from 'nuxt/app'

// eslint-disable-next-line import/prefer-default-export
export const useFetchApi = <DataType>(
  url: string | (() => string),
  options?: UseFetchOptions<DataType>
) => {
  const customFetch = useNuxtApp().$fetchApi as typeof $fetch

  return useFetch(url, {
    ...options,
    lazy: true,
    $fetch: customFetch
  })
}

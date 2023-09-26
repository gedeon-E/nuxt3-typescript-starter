import { useSnackbarStore } from '@/stores/snackbar'

// eslint-disable-next-line max-len
// eslint-disable-next-line import/prefer-default-export, max-len, @typescript-eslint/no-explicit-any
export const useFetchApi = (requestUrl: string, opts: any): Promise<{ data: any, error: any, status: any }> => {
  const config = useRuntimeConfig()
  const { token, signOut } = useAuth()

  const snackbarStore = useSnackbarStore()
  const { showErrorSnackbar } = snackbarStore

  const options = { ...opts }
  if (token) {
    options.headers = {
      Authorization: `${token.value}`
    }
  }
  return new Promise((resolve) => {
    useFetch(requestUrl, {
      baseURL: config.public.baseURL,
      ...options
    }).then((response) => {
      if (response.error.value) {
        if (response.error.value.statusCode === 403) {
          showErrorSnackbar('Vous n\'avez pas les autorisations nécessaires pour effectuer cette action ou accéder à cette ressource')
        } else if (
          response.error.value.statusCode === 400 ||
          response.error.value.statusCode === 409 ||
          response.error.value.statusCode === 422
        ) {
          let message = 'Les données soumises sont incorrectes. '
          if (response.error.value.data && response.error.value.data.msg) {
            if (typeof response.error.value.data.msg === 'string') {
              message += response.error.value.data.msg
            } else if (typeof response.error.value.data.msg === 'object' && response.error.value.data.msg.length > 0) {
              if (response.error.value.data.msg[0].msg) {
                message += response.error.value.data.msg[0].msg
              }
            }
          }
          showErrorSnackbar(message)
        } else if (response.error.value.statusCode !== 401) {
          if (
            response.error.value.statusCode === 404 &&
            response.error.value.data &&
            response.error.value.data.msg
          ) {
            showErrorSnackbar(response.error.value.data.msg)
          } else {
            const msg = response.error.value.data && response.error.value.data.msg
              ? `Détails : ${response.error.value.data.msg}`
              : ''
            showErrorSnackbar(`Une erreur est survenue au niveau du serveur, veuillez contacter l'administrateur. ${msg}`)
          }
        } else if (response.error.value.statusCode === 401 && requestUrl !== '/auth/signin') {
          showErrorSnackbar('Votre session a expirée, veuillez vous reconnecter')
          signOut({ callbackUrl: '/login' })
        }
      }
      resolve(response)
    })
  })
}

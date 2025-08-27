import type { FetchResponse } from 'ofetch'
import { useSnackbarStore } from '@/stores/snackbar'

const HttpErrorHandler = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleFetchError (errorResponse: FetchResponse<any>) {
    const snackbarStore = useSnackbarStore()
    const { showErrorSnackbar } = snackbarStore
    const { getSession } = useAuth()

    const requestUrl = errorResponse.url
    // eslint-disable-next-line no-underscore-dangle
    const isAbortError = errorResponse._data instanceof DOMException && errorResponse._data.name === 'AbortError'

    if (isAbortError) {
      // nothing todo
    } else if (errorResponse.status === 403) {
      showErrorSnackbar('Vous n\'avez pas les autorisations nécessaires pour effectuer cette action ou accéder à cette ressource')
    } else if (
      errorResponse.status === 400 ||
        errorResponse.status === 409 ||
        errorResponse.status === 422
    ) {
      handleBadRequest(errorResponse)
    } else if (errorResponse.status !== 401) {
      handleServerError(errorResponse)
    } else if (errorResponse.status === 401 && requestUrl !== '/auth/signin') {
      showErrorSnackbar('Votre session a expirée, veuillez vous reconnecter')
      getSession({ required: true, callbackUrl: '/login' }).then(() => {
        navigateTo('/login')
      })
    }
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleBadRequest  (errorResponse: FetchResponse<any>) {
    const snackbarStore = useSnackbarStore()
    const { showErrorSnackbar } = snackbarStore

    let message = 'Les données soumises sont incorrectes. '

    // eslint-disable-next-line no-underscore-dangle
    const errorMessage = errorResponse._data?.message || errorResponse._data?.msg
    if (errorMessage) {
      if (typeof errorMessage === 'string') {
        message += errorMessage
      } else if (
        Array.isArray(errorMessage) &&
        errorMessage.length > 0
      ) {
        const errorMessageList = errorMessage as Array<{ msg?: string }>
        if (errorMessageList[0]?.msg) {
          message += errorMessageList[0].msg
        }
      }
    }
    showErrorSnackbar(message)
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleServerError (errorResponse: FetchResponse<any>) {
    const snackbarStore = useSnackbarStore()
    const { showErrorSnackbar } = snackbarStore

    // eslint-disable-next-line no-underscore-dangle
    const errorMessage = errorResponse._data?.msg
    if (errorResponse.status === 404 && errorMessage) {
      showErrorSnackbar(errorMessage as string)
    } else {
      const msg = errorMessage ? `Détails : ${errorMessage}` : ''
      showErrorSnackbar(`Une erreur est survenue au niveau du serveur, veuillez contacter l'administrateur. ${msg}`)
    }
  }
}

export default HttpErrorHandler

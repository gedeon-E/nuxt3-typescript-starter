import { useSnackbarStore } from '@/stores/snackbar'

type ErrorType = {
  statusCode: number
  data: {
    msg?: string
    message?: string
  }
}

type FetchResponseType<DataType> = {
  data: Ref<DataType>
  error: Ref<ErrorType>
  status: unknown
}

// eslint-disable-next-line import/prefer-default-export
export const useFetchApi = <DataType = unknown>(
  requestUrl: string,
  opts: Record<string, unknown>

): Promise<FetchResponseType<DataType>> => {
  const config = useRuntimeConfig()
  const { token, getSession } = useAuth()

  const snackbarStore = useSnackbarStore()
  const { showErrorSnackbar } = snackbarStore

  const options = { ...opts }

  if (token) {
    options.headers = {
      Authorization: `${token.value}`
    }
  }

  return new Promise((resolve) => {
    useFetch<DataType>(requestUrl, {
      baseURL: config.public.baseURL,
      ...options
    }).then((response) => {
      const typedResponse = response as FetchResponseType<DataType>
      if (response.error.value) {
        const isAbortError = (response.error.value?.cause as { name: string })?.name === 'AbortError' || false
        if (isAbortError) {
          // nothing todo
        } else if (response.error.value.statusCode === 403) {
          showErrorSnackbar('Vous n\'avez pas les autorisations nécessaires pour effectuer cette action ou accéder à cette ressource')
        } else if (
          response.error.value.statusCode === 400 ||
          response.error.value.statusCode === 409 ||
          response.error.value.statusCode === 422
        ) {
          handleBadRequest(typedResponse.error)
        } else if (response.error.value.statusCode !== 401) {
          handleServerError(typedResponse.error)
        } else if (response.error.value.statusCode === 401 && requestUrl !== '/auth/signin') {
          showErrorSnackbar('Votre session a expirée, veuillez vous reconnecter')
          getSession({ required: true, callbackUrl: '/login' }).then(() => {
            navigateTo('/login')
          })
        }
      }
      resolve(typedResponse)
    })
  })
}

const handleBadRequest = (
  error: Ref<ErrorType>
) => {
  const snackbarStore = useSnackbarStore()
  const { showErrorSnackbar } = snackbarStore

  let message = 'Les données soumises sont incorrectes. '

  if (
    error.value &&
    error.value.data &&
    (error.value.data.msg || error.value.data.message)
  ) {
    if (
      typeof error.value.data.msg === 'string' ||
      typeof error.value.data.message === 'string'
    ) {
      message += error.value.data.msg || error.value.data.message
    } else if (
      error.value.data.msg &&
      typeof error.value.data.msg === 'object' &&
      (error.value.data.msg as Array<unknown>).length > 0
    ) {
      const errorMsg = error.value.data.msg as Array<{ msg?: string }>
      if (errorMsg[0]?.msg) {
        message += errorMsg[0].msg
      }
    }
  }
  showErrorSnackbar(message)
}

const handleServerError = (
  error: Ref<ErrorType>
) => {
  const snackbarStore = useSnackbarStore()
  const { showErrorSnackbar } = snackbarStore

  if (
    error.value &&
    error.value.statusCode === 404 &&
    error.value.data &&
    error.value.data.msg
  ) {
    showErrorSnackbar(error.value.data.msg as string)
  } else if (error.value) {
    const msg = error.value.data && error.value.data.msg
      ? `Détails : ${error.value.data.msg}`
      : ''
    showErrorSnackbar(`Une erreur est survenue au niveau du serveur, veuillez contacter l'administrateur. ${msg}`)
  }
}

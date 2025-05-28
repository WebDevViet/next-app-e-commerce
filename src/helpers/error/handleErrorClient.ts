import { UseFormSetError } from 'react-hook-form'
import { ExternalToast, toast } from 'sonner'

// * Http
import { HttpError, payloadHttpError } from '@/helpers/http/interceptor/errorInterceptors'

// * Enums
import HttpStatus from '@/enums/httpStatus'
import { TypeError } from '@/enums/typeError'

// * Stores
import useAppStore from '@/stores'

interface ParamsHttpErrorClient {
  error: HttpError | unknown
  setErrorForm?: UseFormSetError<any>
  showAlertDestructive?: boolean
  configToast?: ExternalToast
  isServerAction?: boolean
}

const handleErrorClient = ({
  error,
  setErrorForm,
  showAlertDestructive = false,
  configToast = {},
  isServerAction = false
}: ParamsHttpErrorClient) => {
  if (isServerAction) {
    const errorParse = payloadHttpError.safeParse(error)

    if (errorParse.success) {
      error = new HttpError(errorParse.data)
    }
  }

  if (!(error instanceof HttpError)) {
    return showError(void 0, 'error', configToastContactAdmin(configToast))
  }

  let typeToast: 'warning' | 'error' = 'error'
  let isLoggingOut = false

  if (error.status === HttpStatus.UNAUTHORIZED) {
    isLoggingOut = [
      TypeError.JsonWebTokenError,
      TypeError.NotBeforeError,
      TypeError.RefreshTokenExpiredError,
      TypeError.UnauthorizedError,
      TypeError.ValidationError
    ].includes(error.typeError)

    if (isLoggingOut) {
      typeToast = 'warning'
      useAppStore.setRedirectPath('/login')
      useAppStore.setAuthStatus('loggingOut')
    }
  }

  if (
    error.status === HttpStatus.UNPROCESSABLE_ENTITY &&
    error.typeError === TypeError.BodyError &&
    error.errors &&
    !!setErrorForm
  ) {
    for (const [field, message] of Object.entries(error.errors)) {
      setErrorForm(field, { type: 'server', message })
    }
  }

  if (
    error.status >= HttpStatus.INTERNAL_SERVER_ERROR ||
    error.typeError === TypeError.UnexpectedError ||
    error.typeError === TypeError.ValidationError
  ) {
    configToast = configToastContactAdmin(configToast)
  }

  showError(error?.message, typeToast, configToast)

  function showError(
    message: string = 'System Error',
    typeToast: 'warning' | 'error' = 'error',
    configToast: ExternalToast = {}
  ) {
    if (showAlertDestructive) return useAppStore.setMessageError(message)

    toast[typeToast](message, { ...configToast, richColors: true, id: message })
  }
}

export default handleErrorClient

function configToastContactAdmin(configToast: ExternalToast) {
  return {
    ...configToast,
    description: 'Please try again later. If the problem persists, please contact the administrator.',
    action: {
      label: 'Contact',
      onClick: () => {}
    }
  }
}

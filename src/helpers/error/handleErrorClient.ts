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

  if (!(error instanceof Error)) {
    return toastUnexpectedError()
  }

  const showError = (typeToast: 'warning' | 'error' = 'error') => {
    if (showAlertDestructive) return useAppStore.setMessageError(error.message)

    toast[typeToast](error.message, { ...configToast, richColors: true, id: error.message })
  }

  if (!(error instanceof HttpError)) {
    return showError()
  }

  if (error.typeError === TypeError.UnexpectedError) {
    return toastUnexpectedError()
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

    if (error.typeError === TypeError.ValidationError) {
      toastUnexpectedError(error.message)
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

  if (error.status === HttpStatus.INTERNAL_SERVER_ERROR) {
    toastUnexpectedError(error.message)
  }

  if (isLoggingOut) {
    typeToast = 'warning'
    useAppStore.setRedirectPath('/login')
    useAppStore.setAuthStatus('loggingOut')
  }

  showError(typeToast)

  function toastUnexpectedError(msg: string = 'Unexpected error') {
    toast.error(msg, {
      description: 'Please try again later. If the problem persists, please contact the administrator.',
      // 'Chúng tôi xin lỗi vì sự cố này. Vui lòng thử lại sau ít phút hoặc liên hệ với chúng tôi để được hỗ trợ.'
      ...configToast,
      richColors: true,
      action: {
        label: 'Contact',
        onClick: () => {}
      },
      id: msg
    })
  }
}

export default handleErrorClient

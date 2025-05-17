import { UseFormSetError } from 'react-hook-form'
import { ExternalToast, toast } from 'sonner'

// * Http
import { HttpError } from '@/helpers/http/interceptor/errorInterceptors'

// * Enums
import { TypeError } from '@/enums/typeError'
import HttpStatus from '@/enums/httpStatus'

// * Stores
import useAppStore from '@/stores'

interface ParamsHttpErrorClient {
  error: unknown
  setErrorForm?: UseFormSetError<any>
  showAlertDestructive?: boolean
  configToast?: ExternalToast
}

const handleErrorClient = ({
  error,
  setErrorForm,
  showAlertDestructive = false,
  configToast = {}
}: ParamsHttpErrorClient) => {
  if (!(error instanceof HttpError))
    return toast.error('Unexpected error', {
      description:
        'Something went wrong. Please try again later. If the problem persists, please contact the administrator.',
      // 'Chúng tôi xin lỗi vì sự cố này. Vui lòng thử lại sau ít phút hoặc liên hệ với chúng tôi để được hỗ trợ.'
      ...configToast,
      richColors: true,
      action: {
        label: 'Details',
        onClick: () => {
          // eslint-disable-next-line no-console
          console.error(error)
        }
      }
    })

  const showError = () => {
    if (showAlertDestructive) return useAppStore.setMessageError(error.message)

    toast.error(error.message, { ...configToast, richColors: true })
  }

  if (error.status === HttpStatus.UNAUTHORIZED) {
    showError()

    switch (error.typeError) {
      case TypeError.JsonWebTokenError:
      case TypeError.NotBeforeError:
      case TypeError.RefreshTokenExpiredError:
      case TypeError.UnauthorizedError:
        useAppStore.setAuthStatus('loggingOut')
        break
      default:
        break
    }

    return
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

  if (error instanceof HttpError) return showError()
}

export default handleErrorClient

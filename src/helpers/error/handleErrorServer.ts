// * Http
import { HttpError } from '@/helpers/http/interceptor/errorInterceptors'

// * Enums
import HttpStatus from '@/enums/httpStatus'
import { TypeError } from '@/enums/typeError'
import { ResponseError } from '@/types/response/response'

// * Libraries
import { ZodError } from 'zod'

// * Utils
import formatZodError from '@/utils/formatZodError'

const handleErrorServer = (error: unknown) => {
  let errorResponse: ResponseError

  switch (true) {
    case error instanceof HttpError:
      errorResponse = {
        status: error.status,
        payload: { errors: error.errors, data: null, message: error.message, typeError: error.typeError }
      }
      break
    case error instanceof ZodError:
      // eslint-disable-next-line no-console
      console.log('🚀 ~ handleErrorServer ~ ZodError:', formatZodError(error))
      errorResponse = {
        status: HttpStatus.UNAUTHORIZED,
        payload: {
          errors: null,
          data: null,
          message: 'System Error',
          typeError: TypeError.ValidationError
        }
      }
      break
    default:
      errorResponse = {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        payload: { errors: null, data: null, message: 'System error', typeError: TypeError.UnexpectedError }
      }
      break
  }
  // eslint-disable-next-line no-console
  console.log('🚀 ~ handleErrorServer ~ errorResponse:', errorResponse)
  // TODO: write errorResponse to sentry
  return errorResponse
}

export default handleErrorServer

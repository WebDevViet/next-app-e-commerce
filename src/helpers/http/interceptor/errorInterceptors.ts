// * Libraries
import { z } from 'zod'

// * Enums
import { TypeError } from '@/enums/typeError'

// * Types
import { ErrorInterceptor } from '@/types/interceptor'
// import { builderError, builderErrors } from '@/helpers/error/builderError'

export const payloadHttpError = z.object({
  data: z.null(),
  message: z.string(),
  errors: z.record(z.string()).nullable(),
  typeError: z.nativeEnum(TypeError)
})

export class HttpError extends Error {
  status: number
  errors: Record<string, string> | null
  typeError: TypeError

  constructor({ status, payload }: { status: number; payload: z.infer<typeof payloadHttpError> }) {
    super(payload.message)
    this.status = status
    this.errors = payload.errors
    this.typeError = payload.typeError
  }
}

export const throwHttpError: ErrorInterceptor = ({ responseHttp }) => {
  const error = payloadHttpError.safeParse(responseHttp.payload)

  if (!error.success) {
    throw new HttpError({
      status: responseHttp.status,
      payload: { errors: null, message: 'Unexpected error', typeError: TypeError.UnexpectedError, data: null }
    })
  }

  throw new HttpError({ status: responseHttp.status, payload: error.data })
}

// 401 Unauthorized
// export const [HttpError401] = builderError(401)

// 422 Unprocessable Entity
// export const [HttpError422, throwError422] = builderErrors(422)

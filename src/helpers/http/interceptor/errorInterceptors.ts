// * Libraries
import { z } from 'zod'

// * Enums
import { TypeError } from '@/enums/typeError'

// * Types
import { ErrorInterceptor } from '@/types/interceptor'
// import { builderError, builderErrors } from '@/helpers/error/builderError'

export const payloadHttpError = z.object({
  status: z.number(),
  payload: z.object({
    data: z.null(),
    message: z.string(),
    errors: z.record(z.string()).nullable(),
    typeError: z.nativeEnum(TypeError)
  })
})

export class HttpError extends Error {
  status: number
  errors: Record<string, string> | null
  typeError: TypeError

  constructor({ payload, status }: z.infer<typeof payloadHttpError>) {
    super(payload.message)
    this.status = status
    this.errors = payload.errors
    this.typeError = payload.typeError
  }
}

export const throwHttpError: ErrorInterceptor = ({ responseHttp }) => {
  const error = payloadHttpError.safeParse(responseHttp)

  if (!error.success) {
    throw new HttpError({
      status: responseHttp.status,
      payload: { errors: null, data: null, message: 'System error', typeError: TypeError.UnexpectedError }
    })
  }

  throw new HttpError(error.data)
}

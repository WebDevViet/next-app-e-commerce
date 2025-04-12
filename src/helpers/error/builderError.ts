// * Libraries
import { z } from 'zod'

// * Types
import { ErrorInterceptor } from '@/types/interceptor'
import { TypeError } from '@/enums/typeError'

export const payloadErrorSchema = z.object({
  data: z.null(),
  message: z.string(),
  errors: z.null(),
  typeError: z.nativeEnum(TypeError)
})

const payloadErrorsSchema = z.object({
  data: z.null(),
  message: z.string(),
  errors: z.record(z.string()),
  typeError: z.nativeEnum(TypeError)
})

// HttpError
type ConstructorHttpError = {
  status: number
  payload: z.infer<typeof payloadErrorSchema>
}

class HttpError extends Error {
  status: number
  typeError: TypeError
  constructor({ status, payload }: ConstructorHttpError) {
    super(payload.message)
    this.status = status
    this.typeError = payload.typeError
  }
}

export const builderError = (status: number): [typeof HttpError, ErrorInterceptor] => {
  class CustomHttpErrors extends HttpError {
    constructor(errorData: ConstructorHttpError) {
      super(errorData)
    }
  }

  const throwError: ErrorInterceptor = ({ responseHttp }) => {
    if (responseHttp.status === status) {
      const error = payloadErrorSchema.safeParse(responseHttp.payload)
      if (error.success) {
        throw new CustomHttpErrors({ status, payload: error.data })
      }
    }
  }

  return [CustomHttpErrors, throwError]
}

// HttpErrors
type ConstructorHttpErrors = {
  status: number
  payload: z.infer<typeof payloadErrorsSchema>
}

class HttpErrors extends Error {
  status: number
  errors: Record<string, string>
  typeError: TypeError

  constructor({ status, payload }: ConstructorHttpErrors) {
    super(payload.message)
    this.status = status
    this.errors = payload.errors
    this.typeError = payload.typeError
  }
}

export const builderErrors = (status: number): [typeof HttpErrors, ErrorInterceptor] => {
  class CustomHttpErrors extends HttpErrors {
    constructor(errorData: ConstructorHttpErrors) {
      super(errorData)
    }
  }

  const throwError: ErrorInterceptor = ({ responseHttp }) => {
    if (responseHttp.status === status) {
      const error = payloadErrorsSchema.safeParse(responseHttp.payload)
      if (error.success) {
        throw new CustomHttpErrors({ status, payload: error.data })
      }
    }
  }

  return [CustomHttpErrors, throwError]
}

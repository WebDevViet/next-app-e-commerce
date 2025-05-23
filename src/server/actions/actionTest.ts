'use server'

// * Helpers
import handleErrorServer from '@/helpers/error/handleErrorServer'

// * Services
import nextAuthServices from '@/services/next/auth'
import { ResponseError, ResponseSuccess } from '@/types/response/response'
import { GetMeResponse } from '@/types/response/userResponse'

export async function actionTest(): Promise<ResponseSuccess<GetMeResponse> | ResponseError> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const data = await nextAuthServices.getMe()
    return data
  } catch (e) {
    return handleErrorServer(e)
  }
}

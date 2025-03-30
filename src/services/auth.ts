// * Config
import { CONFIG_API } from '@/configs/api'

// * Schema
import { TBodyLogin } from '@/schemas/schemaValidations/authenSchema'

// * Types
import { TResLogin } from '@/types/response/authenResponse'

// * Utils
import clientToServer from '@/utils/http/clientToServer'

const authService = {
  login: (body: TBodyLogin) => clientToServer.post<TResLogin>(CONFIG_API.AUTH.LOGIN, body)
}

export default authService

// * Http
import clientToServer from '@/utils/http/clientToServer'
import nextToServer from '@/utils/http/nextToServer'

// * Config
import { CONFIG_API } from '@/configs/api'

// * Types
import type { BodyLogin, BodyRegister } from '@/schemas/schemaValidations/authenSchema'
import type { ResponseLogin, ResponseRegister } from '@/types/response/authenResponse'

const authService = {
  login: (body: BodyLogin) => clientToServer.post<ResponseLogin>(CONFIG_API.AUTH.LOGIN, body),
  register: (body: BodyRegister) => clientToServer.post<ResponseRegister>(CONFIG_API.AUTH.REGISTER, body),
  logout: () => nextToServer.post<null>(CONFIG_API.AUTH.LOGOUT, {})
}

export default authService

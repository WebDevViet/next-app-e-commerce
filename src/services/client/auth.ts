// * Http
import clientToServer from '@/helpers/http/clientToServer'

// * Config
import { API_ROUTES } from '@/configs/apiRoutes'

// * Types
import type { BodyLogin, BodyRegister } from '@/schemas/schemaValidations/authenSchema'

const clientAuthServices = {
  login: (body: BodyLogin) => clientToServer.post(API_ROUTES.AUTH.LOGIN, { body }),
  register: (body: BodyRegister) => clientToServer.post(API_ROUTES.AUTH.REGISTER, { body })
}

export default clientAuthServices

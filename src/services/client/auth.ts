// * Http
import clientToServer from '@/helpers/http/clientToServer'

// * Config
import { API_ROUTES } from '@/constants/apiRoutes'

// * Types
import type { BodyLogin, BodyRegister } from '@/schemas/schemaValidations/authenSchema'

const clientAuthServices = {
  login: (body: BodyLogin) => clientToServer.post(API_ROUTES.auth.login, { body }),
  register: (body: BodyRegister) => clientToServer.post(API_ROUTES.auth.register, { body })
}

export default clientAuthServices
